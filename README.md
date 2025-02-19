# 🚗 AutoCars - Plataforma de Anúncios de Carros (Frontend)

Este é o frontend da plataforma AutoCars, criado com foco em performance, acessibilidade e experiência do usuário. Ele permite a publicação e navegação por anúncios de veículos, proporcionando uma experiência fluida e otimizada.

## 🚀 Tecnologias Utilizadas

As principais tecnologias usadas no frontend incluem:

- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) - Framework React para SSR e SSG
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) - Tipagem estática para maior segurança
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) - Estilização moderna e eficiente
- ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&) - Gerenciamento de estado leve
- ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) - Gerenciamento de formulários
- ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue) - Animações fluidas
- ![Shadcn](https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&) - Componentes acessíveis e customizáveis
- ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) - Testes end-to-end e de componentes
- ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white) - Validação de esquemas
- ![Next Themes](https://img.shields.io/badge/NextThemes-000000?style=for-the-badge&) - Modo escuro e claro dinâmico

## 📂 Estrutura de Pastas

```bash
src/
  ├── @types/
  ├── app/
  │   ├── (home)/
  │   │   ├── cars/
  │   │   ├── components/
  │   │   ├── profile/
  │   │   ├── layout.tsx
  │   │   ├── page.tsx
  │   ├── auth/
  │   │   ├── forgot-password/
  │   │   ├── new-password/
  │   │   ├── sign-in/
  │   │   ├── sign-up/
  │   ├── dashboard/
  │   │   ├── components/
  │   │   ├── favorites/
  │   │   ├── manager/
  │   │   ├── profile/
  │   │   ├── seller/
  │   │   ├── layout.tsx
  │   │   ├── not-found.tsx
  ├── assets/
  ├── components/
  ├── context/
  ├── hooks/
  ├── http/
  ├── lib/
  ├── providers/
  ├── styles/
  ├── utils/
  ├── env.mjs
  ├── middleware.ts
```

## 🌟 Funcionalidades Principais

- 📌 **Publicação de anúncios** com upload de imagens
- 🔍 **Pesquisa e filtros** para encontrar veículos rapidamente
- 💾 **Favoritar e curtir anúncios** para acesso rápido
- 💬 **Criar e visualizar comentários** em anúncios
- 🖥 **Painel Dashboard** para gerenciar anúncios e métricas
- 🎨 **Escolha de tema** (escuro, claro ou cores personalizadas como laranja, vermelho, azul, etc.)
- 🚀 **Interface otimista** para respostas instantâneas
- 🎭 **Skeletons de carregamento** para melhor UX
- 📱 **Totalmente responsivo**, adaptado para qualquer tela

## 🔮 Futuras Atualizações

- 💬 **Conversa com vendedor** via chat
- 🛒 **Compra direta de anúncios** com integração de pagamentos
- 📢 **Notificações em tempo real** para interações

---

## ⚙️ Instalação

```bash
$ npm install --legacy-peer-deps
```

## 🚀 Rodando a Aplicação

```bash
# Desenvolvimento
$ npm run dev

# Produção
$ npm run build && npm start
```

---

## 📬 Contato

- **Autor**: YuriLRodrigues
- **LinkedIn**: [Yuri Leite Rodrigues](https://www.linkedin.com/in/yuri-leite-rodrigues)
