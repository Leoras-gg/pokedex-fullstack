import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pokemonRoutes from "./routes/pokemonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import favoritesRoutes from "./routes/favorites.js"; // <== importar rotas de favoritos
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/pokemons", pokemonRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes); // <== registrar rotas de favoritos

app.use(errorHandler);

export default app;
