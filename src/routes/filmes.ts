import { Router } from "express";
import { createFilme, listFilmes } from "../controllers/filmesController";

const router = Router();

router.get("/", listFilmes);
router.post("/", createFilme);

export default router;
