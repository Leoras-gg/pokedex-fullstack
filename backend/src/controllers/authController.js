// src/controllers/authController.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Registrar um novo usuário
 *
 * Responsabilidades:
 * - Validar email e senha enviados no body
 * - Verificar se usuário já existe
 * - Criar usuário no banco
 * - Retornar ID do usuário criado
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validação básica de campos
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // ✅ Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // ✅ Cria novo usuário
    // A senha será criptografada pelo pre("save") no UserSchema
    const user = await User.create({ email, password });

    return res.status(201).json({
      message: "User created successfully",
      userId: user._id
    });
  } catch (error) {
    // ✅ Erro inesperado
    return res.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
};

/**
 * Login do usuário
 *
 * Responsabilidades:
 * - Validar email e senha enviados no body
 * - Verificar se usuário existe
 * - Comparar senha usando bcrypt
 * - Gerar token JWT
 * - Retornar token para autenticação no frontend
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validação básica de campos
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // ✅ Busca usuário no banco
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // ✅ Valida senha com bcrypt
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // ✅ Gera token JWT
    // Payload: { userId }
    // Secret e expiração definidos no .env
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // ✅ Retorna token
    return res.json({ token });
  } catch (error) {
    // ✅ Erro inesperado
    return res.status(500).json({
      message: "Error logging in",
      error: error.message
    });
  }
};
