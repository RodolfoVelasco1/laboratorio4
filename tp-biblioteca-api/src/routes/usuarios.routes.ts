import { Router, RequestHandler } from "express";
import { getUsuarios, getUsuario, registerUsuario, updateUsuario, deleteUsuario } from "../controllers/usuario.controller";

const router: Router = Router();

router.get("/", getUsuarios as RequestHandler);
router.get("/:id", getUsuario as RequestHandler);
router.post("/register", registerUsuario as RequestHandler);
router.put("/:id", updateUsuario as RequestHandler);
router.delete("/:id", deleteUsuario as RequestHandler);

export default router;