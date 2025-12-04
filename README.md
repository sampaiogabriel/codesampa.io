# codesampa.io

O **codesampa.io** é o portfólio pessoal e blog de engenharia de software de Gabriel Sampaio. Este projeto foi desenvolvido para demonstrar a aplicação de tecnologias de ponta no ecossistema React, focando em performance, arquitetura escalável e design de alta fidelidade.

## 🚀 Stack Tecnológica

O projeto foi construído utilizando as versões mais recentes (RC/Beta) das principais ferramentas do mercado:

### Core & Arquitetura

- **Next.js 16** (App Router & Server Actions)
- **React 19**
- **TypeScript**
- **Internacionalização (i18n):** Suporte nativo EN/PT via `next-intl`

### Estilização & UI

- **Tailwind CSS v4**: Próxima geração do framework utilitário
- **Radix UI**: Primitivos de UI acessíveis (Dialog, Dropdown, Slot, etc.)
- **Lucide React**: Biblioteca de ícones
- **Sonner**: Notificações toast de alta performance

### Conteúdo & Dados

- **Velite**: Content Layer para gerenciamento de conteúdo MDX (Blog) type-safe
- **Zod**: Validação de esquemas
- **Resend**: Integração para envio de emails (Newsletter)

### Animações & 3D

- **Framer Motion**: Animações declarativas e layout transitions
- **Three.js Ecosystem**: `@react-three/fiber`, `@react-three/drei` e `@react-three/rapier` para experiências 3D imersivas

## 📂 Estrutura do Projeto

```bash
├── content/              # Arquivos MDX do blog (gerenciados pelo Velite)
├── public/               # Assets estáticos (imagens, favicons, CVs)
├── src/
│   ├── app/
│   │   ├── actions/      # Server Actions (ex: newsletter.ts)
│   │   ├── [locale]/     # Rotas internacionalizadas (Home, Blog, Projetos)
│   │   └── ...
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   ├── pages/        # Componentes específicos de cada página
│   │   └── ui/           # Componentes reutilizáveis (Design System)
│   ├── lib/              # Configurações de i18n e navegação
│   └── utils/            # Constantes, hooks e funções auxiliares
├── velite.config.ts      # Configuração do esquema de conteúdo
```

## 🛠️ Instalação e Configuração

Siga os passos abaixo para executar o projeto localmente:

1.  **Clonar o repositório:**

    ```bash
    git clone [https://github.com/sampaiogabriel/codesampa.io.git](https://github.com/sampaiogabriel/codesampa.io.git)
    cd codesampa.io
    ```

2.  **Instalar dependências:**

    ```bash
    yarn install
    # ou
    npm install
    ```

3.  **Executar o servidor de desenvolvimento:**

    ```bash
    yarn dev
    # ou
    npm run dev
    ```

    O projeto estará disponível em `http://localhost:3000`.

## 📜 Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Cria a versão de produção da aplicação.
- `start`: Inicia o servidor de produção.
- `lint`: Executa o ESLint para verificação de código.

## 👤 Autor

**Gabriel Sampaio**

- Email: gabrielsampaiolima@hotmail.com
- Website: [https://www.codesampa.io](https://www.codesampa.io)

---

_Este projeto é privado e destinado a fins de portfólio pessoal._

````

```

```
````
