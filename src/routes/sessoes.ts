import { Router } from "express";
import { createSessao, listAssentos, listSessoes } from "../controllers/sessoesController";

const router = Router();

router.get("/", listSessoes);
router.post("/", createSessao);
router.get("/:id/assentos", listAssentos);

export default router;
