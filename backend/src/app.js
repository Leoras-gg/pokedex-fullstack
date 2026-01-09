import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Pokédex is running");
});

app.use("/api", pokemonRoutes);
app.use("/api", authRoutes);

app.use(errorHandler);


export default app;
