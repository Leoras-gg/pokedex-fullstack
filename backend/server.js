// Importa a instância do Express do arquivo app.js
import app from "./src/app.js";

// Importa função para conectar ao MongoDB
import { connectDatabase } from "./src/config/database.js";

// Define a porta do servidor (padrão 3001 se não houver variável de ambiente)
const PORT = process.env.PORT || 3001;

// Conecta ao banco de dados antes de iniciar o servidor
connectDatabase();

// Inicializa o servidor Express na porta definida
app.listen(PORT, () => {
  console.log(`Server na porta ${PORT}`);
});
