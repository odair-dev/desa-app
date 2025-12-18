# 🏢 de Sá Incorporações - Frontend

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.2-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/SASS-1.97.0-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass" />
</p>

<p align="center">
  <strong>Plataforma web moderna para visualização e agendamento de imóveis da de Sá Incorporações</strong>
</p>

---

## 📋 Sobre o Projeto

Sistema frontend para a de Sá Incorporações que permite aos clientes:

- 🏠 **Visualizar imóveis** disponíveis no portfólio
- 👤 **Gerenciar conta** (criar, editar, excluir)
- 🔐 **Autenticação segura** com recuperação de senha
- 📅 **Agendar visitas** aos imóveis
- 📧 **Contato direto** via email, telefone e WhatsApp

## 🛠️ Tecnologias

### Core
- **Next.js 14.2.35** - Framework React com SSR
- **TypeScript 5.7.2** - Tipagem estática 
- **React 18.3.1** - Biblioteca de interface
- **Sass 1.97.0** - Pré-processador CSS

### Bibliotecas Principais
- **Axios 1.13.2** - Cliente HTTP
- **React Hook Form 7.68.0** - Gerenciamento de formulários
- **Zod 3.25.76** - Validação de esquemas
- **React Toastify 11.0.5** - Notificações
- **js-cookie** - Gerenciamento de cookies
- **EmailJS 4.4.1** - Envio de emails

## 🚀 Início Rápido

### Pré-requisitos

- **Node.js** ≥ 18
- **npm** ou **yarn**
- **Docker** (para o backend)

### 1️⃣ Backend (Obrigatório)

O frontend depende do backend localizado em `/home/odair/dev/desa/db_desa`.

```bash
# Navegar até o diretório do backend
cd /home/odair/dev/desa/db_desa

# Iniciar containers
docker-compose up -d

# Verificar status
docker ps
```

**Containers necessários:**
- `desa_app` (porta 3000) - API NestJS
- `desa_postgres` (porta 5432) - Banco PostgreSQL  
- `desa_redis` (porta 6379) - Cache/Filas

### 2️⃣ Frontend

```bash
# Clonar e navegar
git clone <repository-url>
cd desa-app

# Instalar dependências
npm install

# Verificar configuração
./check-setup.sh

# Executar em desenvolvimento
npm run dev
```

## 📊 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento (porta 3001)
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Análise de código
```

## 🔧 Configuração

### Variáveis de Ambiente

O projeto usa `.env.local` para configurações locais:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001
```

### Estrutura da API

- **Desenvolvimento**: `http://localhost:3000`
- **Produção**: `https://db-desa-app.onrender.com/api/`

## 🌐 URLs de Acesso

| Serviço | URL | Descrição |
|---------|-----|-----------|
| 🎨 **Frontend** | [http://localhost:3001](http://localhost:3001) | Interface do usuário |
| 🚀 **Backend API** | [http://localhost:3000](http://localhost:3000) | API REST |
| 📚 **Swagger** | [http://localhost:3000/api](http://localhost:3000/api) | Documentação da API |

## 📁 Estrutura do Projeto

```
src/
├── app/              # Páginas (App Router)
├── components/       # Componentes reutilizáveis
├── providers/        # Contextos React
├── services/         # Configuração da API
├── sass/            # Estilos globais
└── img/             # Recursos estáticos
```

## 🔒 Segurança

- ✅ **0 vulnerabilidades** conhecidas
- 🔐 **Autenticação JWT** segura
- 🍪 **Cookies** com configuração adequada
- 🛡️ **Validação** de dados com Zod
- 🔄 **CORS** configurado corretamente

## 🤝 Desenvolvimento

### Verificação de Status

Use o script de verificação para garantir que tudo esteja configurado:

```bash
./check-setup.sh
```

### Build de Produção

```bash
npm run build
```

## 📈 Atualizações de Segurança

**Última atualização:** Dezembro 2025

- Migração de **nookies** para **js-cookie** (mais seguro)
- Atualização do **Next.js** para versão 14.2.35
- Correção de vulnerabilidades críticas e de alta severidade
- Modernização de todas as dependências

---

<p align="center">
  <strong>🏢 de Sá Incorporações - 2025</strong><br>
  Desenvolvido por <a href="https://www.odairsobrinho.com" target="_blank">Odair Sobrinho</a> 🚀
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/odair-sobrinho/" target="_blank">
    <img src="https://img.shields.io/badge/-Odair-blue?style=flat-square&logo=Linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="mailto:odairodriguez@yahoo.com.br">
    <img src="https://img.shields.io/badge/-odairodriguez@yahoo.com.br-slateblue?style=flat-square&logo=Yahoo&logoColor=white" alt="Email" />
  </a>
  <a href="https://www.odairsobrinho.com" target="_blank">
    <img src="https://img.shields.io/badge/-Portfolio-green?style=flat-square&logo=globe&logoColor=white" alt="Portfolio" />
  </a>
</p>
