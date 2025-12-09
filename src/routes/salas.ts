import { Router } from "express";
import { createSala, listSalas } from "../controllers/salasController";

const router = Router();

router.get("/", listSalas);
router.post("/", createSala);

export default router;
