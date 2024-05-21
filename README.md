# ⚠️ Alerta de Precificação de Cobre ⚠️

ℹ️ **Descrição:**
Este é um serviço de alerta de precificação de cobre desenvolvido para monitorar o preço do cobre e enviar um e-mail de alerta caso o preço ultrapasse um determinado limite.

## ⚙️ Funcionalidades ⚙️

- Monitoramento contínuo do preço do cobre.
- Envio de e-mail de alerta quando o preço ultrapassar $4.50.

## 🛠️ Pré-requisitos 🛠️

- Node.js instalado.
- Conta de e-mail do Gmail para utilizar o serviço de envio de e-mails.
- Acesso a uma API de precificação de cobre (por exemplo, Google Finance).

## 🚀 Instalação 🚀

1. Clone este repositório:

` git clone https://github.com/Decompilationist/copper-simple `


2. Instale as dependências do projeto:

` npm start `


3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione as seguintes variáveis:

`EMAIL=sua_conta@gmail.com
SENHA=sua_senha`


Substitua `sua_conta@gmail.com` pela sua conta de e-mail do Gmail e `sua_senha` pela sua senha.

## ▶️ Utilização ▶️

1. Inicie o servidor:

`npm start`


2. Acesse o serviço através do navegador ou de outra aplicação utilizando as rotas disponíveis.

## 🛤️ Rotas 🛤️

- `GET /`: Retorna a página inicial com o formulário de monitoramento de preço.
- `POST /enviar-email`: Endpoint para receber o valor atual do cobre e enviar um e-mail de alerta se necessário.

## 📁 Estrutura do Projeto 📁

- `index.html`: Página inicial com o formulário de monitoramento.
- `src/`: Diretório contendo arquivos estáticos, como imagens.
- `app.js`: Arquivo principal contendo a lógica do servidor.

## 📚 Bibliotecas Utilizadas 📚

- Express.js: Framework web para Node.js.
- Nodemailer: Módulo para enviar e-mails usando Node.js.
- Body-parser: Middleware para analisar o corpo das requisições HTTP.
- Dotenv: Carrega variáveis de ambiente de um arquivo `.env`.

## ⚠️ Aviso ⚠️

Este serviço de alerta de precificação de cobre faz uso do Microsoft Power Automate, a utilização da ferramenta é crucial para o aproveitamento 100% do projeto.
