const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());
app.use(bodyParser.json());

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

// Função para converter dólar para real
async function converterDolarParaReal(precoCobreDolar) {
    try {
        const response = await axios.get(`https://www3.bcb.gov.br/bc_moeda/rest/converter/${precoCobreDolar}/1/220/790/2024-04-26`);
        const valorConvertido = response.data.value;
        return parseFloat(valorConvertido);
    } catch (error) {
        console.error('Erro ao converter dólar para real:', error);
        throw new Error('Erro ao converter dólar para real');
    }
}

async function enviarEmail(preco) {
    try {
        // Converter o preço do cobre para real
        const precoReal = await converterDolarParaReal(preco);

        // Conteúdo do e-mail em HTML
        const htmlContent = `
            <h1>Alerta de Preço do Cobre</h1>
            <p>O preço do cobre ultrapassou $4.50. Preço atual: <strong>$${preco.toFixed(2)}</strong> (em dólar) / R$${precoReal.toFixed(2)} (em real)</p>
            <p><a href="https://www.google.com/finance/quote/HGW00:COMEX">Fonte.</a></p><br><br>
            <img src="https://th.bing.com/th/id/OIP.TPSKIKdPSMLbeqCRH0mv7gAAAA?rs=1&pid=ImgDetMain" alt="Imagem do Cobre">
        `;

        // Opções do e-mail
        const mailOptions = {
            from: process.env.EMAIL,
            to: 'glopes@montana.com.br',
            subject: 'Alerta de Preço do Cobre',
            html: htmlContent, // Conteúdo do e-mail em HTML
            attachments: [
                {
                    filename: 'materiaprimacobre.png', // Nome do arquivo anexado
                    path: 'https://th.bing.com/th/id/OIP.TPSKIKdPSMLbeqCRH0mv7gAAAA?rs=1&pid=ImgDetMain' // URL da imagem a ser anexada
                }
            ]
        };

        // Envia o e-mail
        await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw new Error('Erro ao enviar e-mail');
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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
