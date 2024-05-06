const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json()); // Adicionando middleware para analisar o corpo da requisição como JSON

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.SENHA
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

async function enviarEmail(preco) {
    // Conteúdo do e-mail em HTML
    const htmlContent = `
        <h1>Alerta de Preço do Cobre</h1>
        <p>O preço do cobre ultrapassou $4.50. Preço atual: <strong>$${preco.toFixed(2)}</strong></p>
        <p><a href="https://www.google.com/finance/quote/HGW00:COMEX">Fonte.</a></p><br><br>
        <img src="https://th.bing.com/th/id/OIP.TPSKIKdPSMLbeqCRH0mv7gAAAA?rs=1&pid=ImgDetMain" alt="Imagem do Cobre">
    `;

    // Opções do e-mail
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'rsilva@montana.com.br',
        subject: 'Alerta de Preço do Cobre',
        html: htmlContent, // Conteúdo do e-mail em HTML
        attachments: [
            {
                filename: 'materiaprimacobre.png', // Nome do arquivo anexado
                path: 'https://th.bing.com/th/id/OIP.TPSKIKdPSMLbeqCRH0mv7gAAAA?rs=1&pid=ImgDetMain' // URL da imagem a ser anexada
            }
        ]
    };

    try {
        // Envia o e-mail
        await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}

app.post('/enviar-email', async (req, res) => {
    try {
        const { valorCobre } = req.body;
        console.log('Valor do cobre recebido:', valorCobre);

        if (parseFloat(valorCobre) >= 4.50) {
            await enviarEmail(parseFloat(valorCobre));
            res.json({ message: 'E-mail enviado com sucesso!' });
        } else {
            res.json({ message: 'Preço do cobre não ultrapassou $4.50.' });
        }
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ error: 'Erro ao enviar e-mail' });
    }
});

app.get('/converter/:dollar', async (req, res) => {
  try {
    // Obter o valor do parâmetro 'dollar' do caminho da URL
    const dollar = req.params.dollar;

    // Verificar se o parâmetro 'dollar' é um número válido
    if (isNaN(parseFloat(dollar))) {
      throw new Error('Valor de dólar inválido.');
    }

    // Construir a URL com o valor fornecido para fazer a requisição à API do Banco Central do Brasil
    const url = `https://www3.bcb.gov.br/bc_moeda/rest/converter/${dollar}/1/220/790/2024-05-06`;

    // Fazer a requisição para a API do Banco Central do Brasil
    const response = await axios.get(url);

    // Retornar os dados da resposta
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao testar a API do Banco Central do Brasil:', error);
    res.status(500).send('Erro ao testar a API do Banco Central do Brasil');
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
