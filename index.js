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
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'verboty@gmail.com',
        subject: 'Alerta de Preço do Cobre',
        text: `O preço do cobre ultrapassou $4.50. Preço atual: $${preco.toFixed(2)}`
    };

    try {
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

        if (parseFloat(valorCobre) > 4.50) {
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
