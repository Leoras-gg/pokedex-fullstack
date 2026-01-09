// src/routes/favorites.js
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoritesController.js';

const router = express.Router();

// Rota protegida: só usuários autenticados podem acessar
router.post('/add', authMiddleware, addFavorite);
router.get('/', authMiddleware, getFavorites);
router.delete('/:id', authMiddleware, removeFavorite);

export default router;
