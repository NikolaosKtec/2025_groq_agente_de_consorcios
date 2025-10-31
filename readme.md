# 🚗 Agente de Consórcio de Veículos

## 📋 Descrição do Projeto

Sistema inteligente desenvolvido em React + Express que utiliza a API da Groq para atuar como um agente virtual especializado em consórcio de veículos. A aplicação oferece assistência completa para usuários interessados em adquirir veículos através de consórcio, proporcionando:

- 🤖 Agente virtual inteligente para tirar dúvidas sobre consórcios;
além disso: salva automaticamente dados fornecidos pelo cliente através do chat.
- 🔌 Integração com a Api do Pipefy pelo agente 🤖
- 📝 Explicações detalhadas sobre processos e regulamentações
- 🔍 Comparativos entre diferentes opções de consórcio

## 🚀 Uso

### Para Usuários Finais
1. Acesse a aplicação web
2. Interaja com o chat inteligente para tirar dúvidas
3. Obtenha orientações personalizadas baseadas no seu perfil

### Funcionalidades Principais
- **Chat Interativo**: Conversas naturais sobre consórcios
- **Simulações**: Cálculos de parcelas, taxas e prazos
- **Educação Financeira**: Explicações sobre o funcionamento de consórcios


## 🛠️ Tecnologias Usadas

### Frontend
- **React 19** - Framework principal com hooks modernos
- **Bootstrap CSS** - Layout responsivo e mobile-first
- **Framer Motion** - Animações e transições
- **Chat interativo** - Onde toda inteção acontece
### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para API REST
- **Groq API** - Agente PLN, para conversa natural e tomada de decisões, chamadas por API.
- **Pipefy** - Integração para gestão de processos e workflows, chamadas por API SOAP
- **CORS** - Middleware para cross-origin requests
- **Dotenv** - Gerenciamento de variáveis de ambiente

## ⚙️ Configurando Ambiente

### Pré-requisitos
- Node.js v20 ou mais recente instalado + NPM
- Chave de API da Groq (precisa ter uma conta)
- Chave de API do Pipefy (precisa ter uma conta)


### 🛠️ Passos para Configuração

1. **Clone o repositório**
```bash
git clone https://github.com/NikolaosKtec/SmartAgentChat
```

2. **Instale as dependências do backend**
```bash
cd server
cd npm install
```

3. **Instale as dependências do front-end**
```bash
cd front/react_app_chat 
cd npm install
```
4. **Configure as variaveis de amiente (windows)**
```bash
setx GROQ_API_KEY "sua_chave_da_api_groq_aqui"
```
```bash
setx PIPEFY_KEY "sua_chave_da_api_pipefy_aqui"
```
5.**Execute a aplicação**
- Terminal 1 Backend:
```bash
cd server
cd npm run dev
```
- Terminal 2 Front-end:
```bash
cd front/react_app_chat 
cd npm run dev
```


6.**Acesse a aplicação**

```bash
http://localhost:3001/ //site
http://localhost:3000/ //backend express
```