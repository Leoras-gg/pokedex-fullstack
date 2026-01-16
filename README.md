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

Frontend da **Pokédex Interativa**, desenvolvido em **React**, responsável pela interface do usuário, filtros, autenticação visual, favoritos e visualização detalhada de Pokémons.

Este projeto consome uma **API própria (backend)** e também a **PokeAPI (serviço externo)** para obtenção de dados complementares.

> Projeto desenvolvido **exclusivamente para fins educacionais e avaliação técnica**.

---

## 📌 Visão Geral

- SPA (Single Page Application)
- Comunicação via API REST
- Autenticação baseada em JWT
- Interface responsiva
- Experiência interativa (modais, filtros, áudio)

---

## 🧩 Arquitetura (Frontend)

```
┌──────────────────────────┐
│        React App         │
│   (Vite + Components)    │
└───────────┬──────────────┘
            │
            │ fetch / HTTP (JSON)
            ▼
┌──────────────────────────┐
│      Backend API         │
│  Node.js + Express       │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│        MongoDB           │
└──────────────────────────┘

┌──────────────────────────┐
│        PokeAPI           │
│   (API externa pública)  │
└──────────────────────────┘
```

---

## 🛠 Tecnologias Utilizadas

- **React**
- **Vite**
- **JavaScript (ES Modules)**
- **React Hooks**
- **Fetch API**
- **CSS puro**
- **LocalStorage**

---

## 📁 Estrutura do Projeto

```
src/
├── assets/
├── components/
├── hooks/
├── pages/
├── services/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

---

## 🌐 Integrações Externas

### Backend Próprio
- API REST em Node.js
- Autenticação JWT
- Favoritos persistidos em banco

### PokeAPI
- https://pokeapi.co/
- API pública utilizada para dados complementares
- Não desenvolvida pelo autor

---

## 🚀 Deploy

- **Frontend:** Vercel
- **Backend:** Render

---

## ▶️ Execução Local

```bash
npm install
npm run dev
```

Acesse:
```
http://localhost:5173
```

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**, exclusivamente para fins educacionais.

---

## 👤 Autor

Desenvolvido por **Leandro Horas**  
Projeto criado para estudo, aprendizado e avaliação técnica.
