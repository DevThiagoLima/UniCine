import { Router } from "express";
import { createReservaTemporaria, deleteReservaTemporaria } from "../controllers/reservasTemporariasController";

const router = Router();

router.post("/", createReservaTemporaria);
router.delete("/:id", deleteReservaTemporaria);

export default router;
