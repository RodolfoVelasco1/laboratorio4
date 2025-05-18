import express from "express";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios.routes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/usuarios", usuariosRoutes);

export default app;
