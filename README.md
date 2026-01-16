# Pokédex Fullstack

Projeto de teste técnico — Pokédex interativa com autenticação e favoritos.

## 📦 Pokédex API — Backend

API REST desenvolvida em **Node.js + Express**, responsável por fornecer dados normalizados de Pokémons para o frontend através de api de terceiros, autenticação de usuários e gerenciamento de favoritos.
A aplicação utiliza **MongoDB** como banco de dados e **JWT** para autenticação segura.

Este backend foi desenvolvido **exclusivamente para fins educacionais e avaliação técnica**, como parte de um projeto fullstack.

---

## 🧠 Visão Geral da Arquitetura

Este backend segue uma arquitetura em camadas, separando responsabilidades de forma clara entre **rotas**, **controllers**, **services**, **middlewares** e **database**.

### 🔷 Diagrama de Arquitetura (Backend)

```
┌────────────────────────────┐
│        Client (Any)        │
│  (Browser / Frontend App)  │
└─────────────┬──────────────┘
              │
              │ HTTP Requests (REST)
              ▼
┌────────────────────────────┐
│        Express Server      │
│        src/app.js          │
└─────────────┬──────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
┌──────────────┐   ┌──────────────┐
│  Middlewares │   │    Routes     │
│              │   │               │
│ • CORS       │   │ /api/auth     │
│ • JWT Auth   │   │ /api/pokemons │
│ • Errors     │   │ /api/favorites│
└──────┬───────┘   └──────┬───────┘
       │                  │
       ▼                  ▼
┌─────────────────────────────────┐
│            Controllers          │
│                                 │
│ • AuthController                │
│ • PokemonController             │
│ • FavoritesController           │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│             Services            │
│                                 │
│ • Business rules                │
│ • Data processing               │
│ • External API integration      │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│            MongoDB              │
│        (Mongoose ODM)           │
└─────────────────────────────────┘
```

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **Express**
* **MongoDB**
* **Mongoose**
* **JWT (JSON Web Token)**
* **bcrypt**
* **CORS**
* **dotenv**
* **ES Modules**

---

## 📂 Estrutura de Pastas

```
src/
├── app.js                 # Configuração principal do Express
├── server.js              # Inicialização do servidor
├── config/
│   └── database.js        # Conexão com MongoDB
├── controllers/
│   ├── authController.js
│   ├── pokemonController.js
│   └── favoritesController.js
├── routes/
│   ├── authRoutes.js
│   ├── pokemonRoutes.js
│   └── favorites.js
├── middlewares/
│   ├── authMiddleware.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   └── Favorite.js
└── services/
    └── pokemonService.js
```

---

## 🔐 Autenticação

A autenticação é baseada em **JWT**:

* Login gera um token JWT
* Token deve ser enviado no header:

```
Authorization: Bearer <token>
```

* Rotas protegidas utilizam `authMiddleware`

---

## 📌 Endpoints Principais

### 🔑 Autenticação

- JWT (JSON Web Token)
- Token enviado via header `Authorization: Bearer <token>`
- Middleware protege rotas sensíveis (favoritos)

| Método | Rota                 | Descrição              |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Registro de usuário    |
| POST   | `/api/auth/login`    | Login e geração de JWT |

---

### 🧬 Pokémons

| Método | Rota                | Descrição              |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/pokemons/all` | Lista de Pokémons      |
| GET    | `/api/pokemons/:id` | Detalhes de um Pokémon |

---

### ⭐ Favoritos (Protegido)

| Método | Rota                 | Descrição          |
| ------ | -------------------- | ------------------ |
| GET    | `/api/favorites`     | Listar favoritos   |
| POST   | `/api/favorites/add` | Adicionar favorito |
| DELETE | `/api/favorites/:id` | Remover favorito   |

---

## 🌐 Integração com API Externa (PokeAPI)

Este projeto **não desenvolve nem mantém** a base de dados de Pokémons.

Os dados detalhados dos Pokémons são obtidos através da **PokeAPI**, uma API pública e gratuita:

- 🔗 https://pokeapi.co/
- Utilizada apenas para **consulta de dados**
- Sem qualquer modificação ou redistribuição de conteúdo

> A PokeAPI é um serviço de terceiros, utilizado neste projeto exclusivamente para fins educacionais e demonstração técnica.

## 🌍 CORS

A API está configurada para aceitar requisições de origens específicas:

```js
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pokedex-fullstack-eta.vercel.app"
  ]
}));
```

---

## ⚙️ Variáveis de Ambiente (`.env`)

```env
PORT=3001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=sua_chave_super_secreta
```

---

## 🚀 Deploy

* **Backend**: Render
* **Banco de Dados**: MongoDB Atlas

URL de produção:

```
https://pokedex-backend-oqge.onrender.com
```

---

## 🧪 Execução Local

```
npm install
npm run dev
```

Servidor disponivel em: 

```
https://localhost:3001
```

---

## ✅ Status do Projeto

* [x] API funcional
* [x] Autenticação JWT
* [x] MongoDB integrado
* [x] CORS configurado
* [x] Pronto para produção

---

## ⚠️ Observações Técnicas

Projeto estruturado seguindo separação de responsabilidades

Tratamento centralizado de erros

Código orientado a clareza e manutenção

Foco em boas práticas para avaliação técnica

---

## PokeAPI

Os dados de Pokémons são fornecidos pela PokeAPI, que possui suas próprias políticas e termos de uso.

---

# Pokédex Frontend

Frontend da Pokédex construída em **React**. Este projeto consome a API de Pokémons do backend, permitindo buscar, filtrar, favoritar e visualizar detalhes de cada Pokémon.

---

## Tecnologias

- **React** – Biblioteca principal para construção de UI.
- **Hooks** – `useState`, `useEffect`, `useMemo`, `useRef` para gerenciamento de estado e efeitos.
- **Fetch API** – Para comunicação com o backend e PokéAPI.
- **CSS puro** – Organização em arquivos dedicados (`global.css`, `pokemon-card.css`, `types.css`).

---

## Estrutura do Projeto

```
src/
├── assets/ # Imagens e ícones (types, sprites, etc.)
├── components/ # Componentes reutilizáveis
│ ├── AuthModal.jsx
│ ├── Navbar.jsx
│ ├── PokemonCard.jsx
│ └── PokemonModal.jsx
├── hooks/ # Custom hooks
│ └── usePokemons.js
├── pages/
│ └── Home.jsx
├── services/ # Chamadas HTTP
│ ├── authService.js
│ └── pokemonService.js
├── styles/ # CSS do projeto
│ ├── global.css
│ ├── pokemon-card.css
│ ├── types.css
│ └── typeColors.css
├── utils/ # Utilitários (ex.: typeIcons)
│ └── typeIcons.js
├── App.jsx
└── main.jsx
```

---

## Componentes

### 1. `Home.jsx`
- Página principal da Pokédex.
- Integração com:
  - **Navbar**: busca por nome/ID, filtro por tipo e controle de limite de cards.
  - **PokemonCard**: exibe informações básicas, sprite e botão de favorito.
  - **PokemonModal**: mostra detalhes do Pokémon (stats, habilidades, evoluções).
  - **AuthModal**: login e registro de usuários.

- Gerencia estado de:
  - Pokémons carregados (`usePokemons`)
  - Favoritos do usuário
  - Autenticação
  - Modais e reprodução de sons (cry)

---

### 2. `Navbar.jsx`
- Barra de navegação e filtros.
- Props principais:
  - `searchText` e `setSearchText` – busca por nome ou ID
  - `setFilterType` – filtro de tipo
  - `limit` e `setLimit` – quantidade de cards por página
  - `isAuthenticated` – estado do usuário
  - `onLoginClick` / `onLogoutClick` – gerenciamento de sessão

---

### 3. `AuthModal.jsx`
- Modal de login e registro.
- Valida email e senha localmente.
- Chama `authService` para login e registro.
- Props:
  - `onClose` – fecha o modal
  - `onLoginSuccess` – atualiza estado de autenticação no frontend

---

### 4. `PokemonCard.jsx`
- Card individual de cada Pokémon.
- Props:
  - `pokemon` – objeto Pokémon (`id`, `name`, `types`, `sprite`, `sound`)
  - `isFavorite` – indica se está nos favoritos
  - `onToggleFavorite` – adiciona/remover favorito
  - `onClick` – abre modal com detalhes
- Toca o **cry** do Pokémon ao clicar no card.
- Exibe tipos com ícones, número e nome.

---

### 5. `PokemonModal.jsx`
- Modal detalhado do Pokémon.
- Mostra:
  - Sprite maior
  - Tipos
  - Habilidades
  - Stats (HP, Attack, etc.)
  - Evoluções
- Prop `onClose` fecha a modal e interrompe o som do cry.

---

## Hooks

### `usePokemons.js`
- Gerencia:
  - Lista de Pokémons
  - Filtros por tipo e busca
  - Paginação
- Debounce da busca (`setDebouncedSearch`)
- Cache em memória para não refazer fetchs desnecessários

---

## Serviços

### 1. `authService.js`
- `loginRequest(email, password)` – retorna token JWT
- `registerRequest(name, email, password)` – cria usuário

### 2. `pokemonService.js`
- `fetchPokemons()` – busca lista completa do backend com `id`, `name`, `types`, `sprite` e `sound`.
- `fetchPokemonDetails(pokemonId)` – busca detalhes completos da PokéAPI (stats, abilities, evolutions)

---

## Estilos

- **global.css** – fonte, reset e layouts gerais.
- **pokemon-card.css** – layout do card, rodapé, estrela de favorito.
- **types.css** – cores e gradientes leves por tipo de Pokémon.
- **typeColors.css** – cores sólidas e box-shadow para ícones de tipos.

- Gradientes nos cards:
  - Base no tipo do Pokémon
  - Cor mais clara perto do botão de favorito
  - Cor mais escura no topo do card

- Modais:
  - `auth-modal` e `pokemon-modal` com botão de fechar no **canto superior direito**
  - Overlay semi-transparente

---

## Como Rodar

1. Clonar o repositório:
```
git clone <repo-url>
cd frontend
``` 

2. Instalar dependencias

```
npm install
```

3. Rodar aplicação:

```
npm run dev
```

4. Abrir no navegador

```
http://localhost:5173
```

O frontend espera que o backend esteja rodando em http://localhost:3001.

## Observações

-Autenticação: via JWT, armazenado no localStorage.

-Favoritos: só podem ser gerenciados se o usuário estiver autenticado.

-Som (cry): cada card pode reproduzir o som do Pokémon ao clicar.

-Paginação: implementada no frontend via hook usePokemons.

-Busca: debounce de 400ms para performance.

-Design: inspirado na Nintendo, cores temáticas por tipo, cards e modais modernos e responsivos.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT, permitindo uso, modificação e distribuição para fins educacionais.

---

## 👤 Autor

Desenvolvido por Leandro Horas
Projeto criado para estudo, aprendizado e avaliação técnica.
