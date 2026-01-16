// src/middlewares/errorHandler.js

/**
 * Middleware global de tratamento de erros
 *
 * Responsabilidades:
 * - Captura qualquer erro lançado nas rotas ou middlewares anteriores
 * - Loga o erro no console para depuração
 * - Retorna uma resposta padrão ao cliente (status 500)
 *
 * Observações:
 * - Não deve revelar detalhes sensíveis em produção
 * - Pode ser expandido para lidar com diferentes tipos de erro (ex: validação, auth, not found)
 *
 * @param {Error} err - objeto de erro lançado
 * @param {Request} req - objeto de requisição Express
 * @param {Response} res - objeto de resposta Express
 * @param {Function} next - próximo middleware (não usado aqui)
 */
export const errorHandler = (err, req, res, next) => {
  // Log completo do erro no console para depuração
  console.error(err);

  // Resposta padrão para o cliente
  return res.status(500).json({
    message: "Internal server error"
  });
};
