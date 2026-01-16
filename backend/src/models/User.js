// src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Esquema do usuário
 *
 * Campos:
 * - email: obrigatório, único, lowercase e trimmed
 * - password: obrigatório, será armazenado hashed
 * - favorites: array de IDs de Pokémons favoritos (strings)
 *
 * Timestamps:
 * - createdAt, updatedAt automáticos
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    favorites: {
      type: [String],
      default: [] // Array de IDs de Pokémon
    }
  },
  {
    timestamps: true
  }
);

/**
 * Middleware "pre-save"
 *
 * Executa **antes de salvar** o usuário no banco.
 * Objetivo:
 * - Hashear a senha somente se foi modificada.
 */
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // não re-hasheia senhas já existentes

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Método de instância: comparePassword
 *
 * Permite validar a senha fornecida pelo usuário contra a senha hashed.
 *
 * @param {string} password - senha em texto puro
 * @returns {Promise<boolean>} true se a senha confere, false caso contrário
 */
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

/**
 * Exporta o modelo do usuário
 */
export default mongoose.model("User", UserSchema);
