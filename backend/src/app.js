// src/app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importação das rotas
import pokemonRoutes from "./routes/pokemonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import favoritesRoutes from "./routes/favorites.js"; // Rotas de favoritos

// Importação do middleware de tratamento de erros
import { errorHandler } from "./middlewares/errorHandler.js";

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// ============================
// Inicialização do Express
// ============================
const app = express();

// ============================
// Middlewares globais
// ============================

// Habilita CORS (Cross-Origin Resource Sharing)
// Permite que frontends em domínios diferentes acessem a API

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173", //LOCAL NESTE PROJETO
      //"https://pokedex-fullstack-eta.vercel.app" EXEMPLO DE COMO DEVE FICAR EM PROD.
    ];

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Permite que o Express interprete JSON no body das requisições
app.use(express.json());

// ============================
// Registro de rotas
// ============================

// Rotas para operações com Pokémons
// Ex.: GET /api/pokemons/all
app.use("/api/pokemons", pokemonRoutes);

// Rotas de autenticação (login e registro)
// Ex.: POST /api/auth/login, POST /api/auth/register
app.use("/api/auth", authRoutes);

// Rotas de favoritos (GET, POST, DELETE) protegidas via authMiddleware
// Ex.: GET /api/favorites, POST /api/favorites/add, DELETE /api/favorites/:id
app.use("/api/favorites", favoritesRoutes);

// ============================
// Middleware de tratamento de erros
// ============================
// Captura qualquer erro não tratado nas rotas e retorna JSON
app.use(errorHandler);

// ============================
// Exporta a instância do Express
// ============================
export default app;
