🌐 GitHub Repository for DKosan Portofolio Website Project. This is a [Next.js 15](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About the Project

DKosan Portfolio is a collaborative project created by a group of friends to serve as a centralized portofolio and documentation hub. This site serves as a hub for each member to showcase their individual portofolios, highlighting skills, projects, and accomplishments. Additionally, it functions as a centralized space for documentation and galleries of all activities carried out by the dkosan.

## Tech Stack

List the main technologies used in this project, including:

- **Framework:** Nextjs 15 with React 18
- **Language:** Typescript
- **Styling:**
  - Tailwind
  - UI Library:
    - ShadCn
    - MagicUI
- **Database:**
  - Mysql manage using Drizzle ORM

## Design

You can view the full design layout DKosan Portofolio with excalidraw [here](https://excalidraw.com/#room=d01ee14ee6d3dfcaa9fe,Nnp33P_s9TemA-8iMXlFxA).

## Running The Development Server

First, install the project dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

The project follows a modular structure to keep code organized and maintainable. Here's an overview of the key folders and their purposes:

```bash
.
├── /app                # Main app folder for App Router (Next.js)
│   ├── /api            # API route handlers
│   └── /layout         # Application-wide layouts and structure
│
├── /components         # Reusable UI components
│   ├── /ui             # ShadCN and MagicUI components
│   └── /global         # Globally used components like icons, buttons, etc.
│
├── /hooks              # Custom React hooks for managing state, effects, etc.
│
├── /lib                # Utility functions, helper methods, and shared configurations
│   └── /db             # Database configurations, migrations, and schema using Drizzle ORM
│
├── /public             # Static assets like images, fonts, and icons
│
├── /server             # Server actions and related logic
│
└── /styles             # Global styles and other style utilities
```

## Environment Setup

Ensure you create a `.env.local` file for the `Database` and `Authentication` configuration on your local machine. This file should contain all necessary environment variables, that should be something like this:

```.env.local
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=yourdb

AUTH_SECRET=randomsecretkey
```

## Contributing Guidelines

First of all, thank you so much for considering contributing to this project! Contributions, whether big or small, are incredibly valuable and help make the project better for everyone.
If you have an idea, found a bug, or have suggestions for improvement, please feel free to jump in!

#### 1. Notes and Comments

We recommend installing the Visual Studio Code extension `Better Comments` to enhance your code commenting by using annotations effectively.
Below is a guide on how to use these comments:

```typescript
// * Important or Highlighted Information
// ! Alert, Do not use!
// ? Something to consider or Note some variabel to other developers
// TODO : Task or Reminder parts of the code that need to be completed later.
```

#### 2. Getting Help

If you have any questions or need guidance, don't hesitate to reach out! You can start a discussion, open an issue, or contact the maintainers directly. We're here to help and ensure your contribution process is smooth and rewarding.
