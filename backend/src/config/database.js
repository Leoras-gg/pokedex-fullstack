// src/config/database.js

import mongoose from "mongoose";

/**
 * Conecta ao banco de dados MongoDB usando o Mongoose.
 *
 * Usa a variável de ambiente MONGODB_URI para obter a string de conexão.
 *
 * Se a conexão falhar, exibe o erro no console e encerra a aplicação.
 */
export const connectDatabase = async () => {
  try {
    // Tenta conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,   // Parser moderno de URL
      useUnifiedTopology: true // Motor de monitoramento moderno
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    // Caso haja falha na conexão
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Encerra a aplicação
  }
};
