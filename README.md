## Pokédex Fullstack

Projeto de teste técnico — Pokédex interativa com autenticação e favoritos.

                ┌─────────────┐
                │  Frontend   │
                │ React App   │
                └─────┬───────┘
                      │
                      │ HTTP Requests (fetch / axios)
                      ▼
             ┌─────────────────────┐
             │     Express App     │  src/app.js
             └─────────┬───────────┘
                       │
        ┌──────────────┴────────────────┐
        │                               │
        ▼                               ▼
┌───────────────┐                ┌───────────────┐
│  Middleware   │                │   Routes      │
│               │                │               │
│ authMiddleware│                │ /api/pokemons │
│  (JWT check)  │                │ /all → getAllPokemons()
│ errorHandler  │                │ /api/auth     │
└───────────────┘                │ /register → register()
                                 │ /login → login()
                                 │ /api/favorites │
                                 │ GET / → getFavorites()
                                 │ POST /add → addFavorite()
                                 │ DELETE /:id → removeFavorite()
                                 └─────┬─────────┘
                                       │
                                       ▼
                             ┌─────────────────┐
                             │ Controllers     │
                             │                 │
                             │ pokemonController│
                             │ authController  │
                             │ favoritesController │
                             └────────┬────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │  Services /     │
                             │  Utils          │
                             │ pokemonService  │
                             │ pokemonCache    │
                             └────────┬────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │   MongoDB       │
                             │ (Users & Fav)   │
                             └─────────────────┘

Descrição do Fluxo

Frontend faz requisições HTTP para o backend:

Pokémons (/api/pokemons/all)

Autenticação (/api/auth/register, /api/auth/login)

Favoritos (/api/favorites)

Middleware

authMiddleware: protege rotas que precisam de login, decodificando JWT e anexando req.user.

errorHandler: captura erros não tratados e retorna JSON com status 500.

Controllers

pokemonController: busca todos os Pokémons com cache e normalização.

authController: registra novos usuários e realiza login, gerando JWT.

favoritesController: adiciona, remove e retorna favoritos de um usuário.

Services / Utils

pokemonService: faz fetch de dados detalhados da PokéAPI (sprite, tipos, cries).

pokemonCache: cache em memória para reduzir requisições à PokéAPI.

Banco de Dados

MongoDB com Mongoose:

Usuários (User) com email, password e favorites.

Senhas criptografadas via bcrypt antes de salvar.

JWT usado para autenticação.

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
```bash
git clone <repo-url>
cd frontend

2. Instalar dependencias
```bash
npm install

3. Rodar aplicação:

npm run dev

4. Abrir no navegador

http://localhost:5173

O frontend espera que o backend esteja rodando em http://localhost:3001.

## Observações

-Autenticação: via JWT, armazenado no localStorage.

-Favoritos: só podem ser gerenciados se o usuário estiver autenticado.

-Som (cry): cada card pode reproduzir o som do Pokémon ao clicar.

-Paginação: implementada no frontend via hook usePokemons.

-Busca: debounce de 400ms para performance.

-Design: inspirado na Nintendo, cores temáticas por tipo, cards e modais modernos e responsivos.
