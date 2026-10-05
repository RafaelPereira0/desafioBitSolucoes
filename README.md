# Sistema de Gerenciamento de Chamados

Sistema web desenvolvido como desafio técnico para gerenciamento e acompanhamento de chamados.

A aplicação permite que usuários autenticados criem e acompanhem chamados, enquanto o painel possibilita visualizar, filtrar e atualizar as informações dos chamados.

## 🚀 Tecnologias utilizadas

### Frontend

* React
* TypeScript
* Vite
* React Hook Form
* React Query
* Axios
* Lucide React
* CSS

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* Zod
* Bcrypt

## 📋 Funcionalidades

### Autenticação

* Login de usuários
* Autenticação utilizando JWT
* Proteção das rotas privadas
* Controle de acesso baseado no usuário autenticado

### Chamados

* Criação de chamados
* Visualização dos chamados
* Edição de chamados
* Atualização do status
* Visualização de categoria e solicitante
* Data de criação
* Busca por título, solicitante ou categoria
* Filtro por status

### Status dos chamados

Os chamados possuem três possíveis estados:

* `OPEN` — Aberto
* `IN_PROGRESS` — Em andamento
* `COMPLETED` — Concluído

### Dashboard

O sistema possui um painel para acompanhamento dos chamados, permitindo visualizar informações gerais e ter uma visão rápida da situação atual dos atendimentos.

## 🏗️ Estrutura do projeto

O projeto está dividido em duas aplicações:

```text
projeto/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── schemas/
│   │   └── index.ts
│   │
│   ├── prisma/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── types/
    │   └── App.tsx
    │
    └── package.json
```

## 🔐 Autenticação

A autenticação é realizada através de JWT.

Após o login, o usuário autenticado recebe um token utilizado nas requisições às rotas protegidas da API.

As rotas privadas possuem um middleware responsável por verificar a existência e validade do token antes de permitir o acesso.

As senhas dos usuários são armazenadas utilizando hash com Bcrypt.

## 🔄 Comunicação entre Frontend e Backend

O frontend utiliza Axios para realizar as requisições HTTP para a API.

O React Query é utilizado para gerenciamento das requisições e dos dados vindos do backend, facilitando o controle de carregamento, atualização e cache das informações.

Fluxo simplificado:

```text
React
  ↓
React Query / Axios
  ↓
API Express
  ↓
Services
  ↓
Prisma
  ↓
PostgreSQL
```

## ⚙️ Como executar o projeto

### Pré-requisitos

É necessário ter instalado:

* Node.js
* PostgreSQL
* Git

### 1. Clonar o projeto

```bash
git clone URL_DO_REPOSITORIO
cd NOME_DO_PROJETO
```

### 2. Configurar o Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado nas variáveis necessárias pelo projeto.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

O backend ficará disponível na porta configurada no projeto.

### 3. Configurar o Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

O frontend será disponibilizado pelo Vite, normalmente em:

```text
http://localhost:5173
```

## 🗄️ Banco de dados

O projeto utiliza PostgreSQL como banco de dados e Prisma como ORM.

O banco possui entidades relacionadas aos usuários, categorias e chamados.

O Prisma é responsável pelo acesso ao banco e pela organização dos relacionamentos entre as entidades.

## 📌 Decisões técnicas

Durante o desenvolvimento, procurei separar as responsabilidades da aplicação entre as diferentes camadas.

No backend, a estrutura foi organizada de forma a manter as regras de negócio separadas das rotas e da camada de acesso ao banco.

No frontend, componentes reutilizáveis foram criados para elementos como modais e formulários, enquanto hooks foram utilizados para centralizar o acesso aos dados da API.

Também foram utilizadas validações nos dados recebidos pela API para evitar informações inválidas.

## 🔎 Melhorias futuras

Algumas melhorias que poderiam ser implementadas em uma próxima versão:

* Paginação dos chamados
* Filtros por período e categoria
* Ordenação dos chamados
* Histórico de alterações dos chamados
* Notificações em tempo real
* Dashboard com gráficos
* Testes automatizados
* Docker para facilitar a configuração do ambiente
* Controle de permissões mais detalhado
* Melhorias de responsividade

## 🎯 Objetivo do projeto

O objetivo principal foi desenvolver uma aplicação funcional para gerenciamento de chamados, aplicando conceitos de desenvolvimento full-stack, autenticação, APIs REST, banco de dados relacional, gerenciamento de estado e organização de código.

O projeto também foi desenvolvido buscando manter uma estrutura que permita sua evolução e manutenção posteriormente.

## 👨‍💻 Autor

**Irineu Silva**

Projeto desenvolvido como parte de um desafio técnico.
