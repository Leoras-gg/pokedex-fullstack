// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Pegar o token do header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1];

    // Checa se token é o token de teste
    if (process.env.TEST_JWT && token === process.env.TEST_JWT) {
      // Cria um usuário "fake" para testes
      req.user = { id: 'test-user', nome: 'Teste', favoritos: [1, 25, 7] };
      return next();
    }

    // 2. Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Buscar o usuário no banco (opcional, mas útil)
    const user = await User.findById(decoded.id).select('-senha'); // não retorna a senha
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // 4. Adicionar usuário ao request para usar nas rotas protegidas
    req.user = user;

    next();
  } catch (error) {
    console.error('Erro de autenticação:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;
