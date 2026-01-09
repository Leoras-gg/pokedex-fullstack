import app from "./src/app.js";
import { connectDatabase } from "./src/config/database.js";

const PORT = process.env.PORT || 3001;

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server na porta ${PORT}`);
});
