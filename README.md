# AssistenteRPG - Jujutsu Kaisen - Frontend

Interface web da aplicação para gerenciamento de campanhas e personagens do sistema de RPG de mesa baseado em Jujutsu Kaisen.

## 🚀 Stack Tecnológica

- **Framework**: Next.js 14.x (App Router)
- **Linguagem**: TypeScript 5.x
- **Estilização**: Tailwind CSS
- **Componentes UI**: shadcn/ui + Radix UI
- **Gerenciamento de Estado**: React Context / Zustand
- **Comunicação em Tempo Real**: Socket.io Client
- **Formulários**: React Hook Form + Zod
- **Requisições HTTP**: Axios / Fetch API
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x ou yarn >= 1.22.x

## 🔧 Instalação

Clone o repositório
git clone https://github.com/viniciusfs-seno/rpg-jujutsu-frontend.git
cd rpg-jujutsu-frontend

Instale as dependências
npm install

ou
yarn install


## ⚙️ Configuração

Crie um arquivo `.env.local` na raiz do projeto:

Backend API
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_WS_URL="http://localhost:3000"

Cloudinary (Upload de Imagens)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""

Environment
NODE_ENV="development"


## 🏃 Execução

Desenvolvimento
npm run dev

Build de produção
npm run build

Executar build de produção localmente
npm run start

Lint
npm run lint


Acesse a aplicação em `http://localhost:3000`

## 📁 Estrutura do Projeto

app/
├── (auth)/ # Rotas de autenticação (agrupadas)
│ ├── login/
│ └── register/
├── (dashboard)/ # Rotas protegidas (agrupadas)
│ ├── campaigns/ # Lista e detalhes de campanhas
│ ├── characters/ # Fichas de personagens
│ │ ├── [id]/
│ │ └── create/
│ ├── combat/ # Sistema de combate/iniciativa
│ ├── rules/ # Documentação do RPG
│ └── sessions/ # Relatórios e anotações
├── api/ # Route Handlers (se necessário)
├── layout.tsx # Layout raiz
└── page.tsx # Página inicial

components/
├── ui/ # Componentes base (shadcn/ui)
│ ├── button.tsx
│ ├── card.tsx
│ ├── dialog.tsx
│ └── ...
├── character/ # Componentes de ficha
│ ├── CharacterSheet.tsx
│ ├── AttributesPanel.tsx
│ ├── SkillsPanel.tsx
│ └── PowersPanel.tsx
├── combat/ # Componentes de combate
│ ├── InitiativeTracker.tsx
│ └── CombatLog.tsx
├── chat/ # Componentes de chat
│ └── ChatBox.tsx
├── layout/ # Componentes de layout
│ ├── Header.tsx
│ ├── Sidebar.tsx
│ └── Footer.tsx
└── shared/ # Componentes compartilhados
├── Loading.tsx
└── ErrorBoundary.tsx

lib/
├── api/ # Funções de API
│ ├── auth.ts
│ ├── characters.ts
│ └── campaigns.ts
├── hooks/ # Custom hooks
│ ├── useAuth.ts
│ ├── useWebSocket.ts
│ └── useCharacter.ts
├── utils/ # Funções utilitárias
│ ├── calculations.ts # Cálculos da ficha
│ └── validators.ts
├── types/ # Definições de tipos
│ ├── character.ts
│ └── campaign.ts
└── constants/ # Constantes da aplicação
└── rules.ts

styles/
└── globals.css # Estilos globais + Tailwind


## 🎨 Componentes UI

Este projeto utiliza [shadcn/ui](https://ui.shadcn.com/) para componentes base. Para adicionar novos componentes:

npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog


## 🔌 WebSocket (Tempo Real)

Exemplo de uso para chat e combate:


import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_WS_URL!);

useEffect(() => {
socket.on('connect', () => {
console.log('Conectado ao servidor');
});

socket.on('message', (data) => {
console.log('Nova mensagem:', data);
});

return () => {
socket.disconnect();
};
}, []);


## 🎯 Funcionalidades Principais

- ✅ Autenticação de usuários (login/registro)
- ✅ Gerenciamento de campanhas
- ✅ Criação de personagens com cálculos automatizados
- ✅ Sistema de combate e iniciativa em tempo real
- ✅ Chat entre jogadores
- ✅ Documentação integrada do sistema de RPG
- ✅ Relatórios e anotações de sessões
- ✅ Diferenciação de permissões (mestre vs jogador)
- ✅ Interface responsiva

## 🚢 Deploy na Vercel

### Deploy Automático

1. Conecte seu repositório do GitHub à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. A cada push na branch `main`, o deploy será automático

### Deploy Manual

Instalar Vercel CLI
npm install -g vercel

Login
vercel login

Deploy
vercel

Deploy em produção
vercel --prod


## 🧪 Testes

Testes unitários (quando implementados)
npm run test

Testes e2e (quando implementados)
npm run test:e2e


## 📝 Scripts Disponíveis

{
"dev": "Inicia servidor de desenvolvimento",
"build": "Gera build de produção",
"start": "Inicia servidor de produção",
"lint": "Executa o linter",
"type-check": "Verifica tipos TypeScript"
}


## 🎨 Padrões de Código

- **Componentes**: PascalCase (ex: `CharacterSheet.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useCharacter.ts`)
- **Utilitários**: camelCase (ex: `calculateAttribute.ts`)
- **Tipos**: PascalCase com sufixo `Type` ou interface (ex: `CharacterType`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAX_CHARACTERS`)

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:
- Desktop (1920px+)
- Laptop (1366px - 1919px)
- Tablet (768px - 1365px)
- Mobile (320px - 767px)

## ♿ Acessibilidade

- Suporte a navegação por teclado
- Labels apropriados em formulários
- Contraste de cores adequado
- ARIA labels implementados

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
2. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
3. Push para a branch (`git push origin feature/MinhaFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto é privado e de uso pessoal.

## 👤 Autor

**Vinicius Ferreira Seno**
- GitHub: [@viniciusfs-seno](https://github.com/viniciusfs-seno)

## 🔗 Links Relacionados

- [Backend Repository](https://github.com/viniciusfs-seno/rpg-jujutsu-backend)
- [Documentação do Sistema](link-para-documento)

---

**Status do Projeto**: 🚧 Em desenvolvimento ativo

**Última atualização**: Novembro 2025
