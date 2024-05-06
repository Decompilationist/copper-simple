const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

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
        <a href="https://www.google.com/finance/quote/HGW00:COMEX">Fonte.</a>
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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
