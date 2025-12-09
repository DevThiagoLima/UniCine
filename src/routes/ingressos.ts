import { Router } from "express";
import { createIngresso, listIngressos } from "../controllers/ingressosController";

const router = Router();

router.get("/", listIngressos);
router.post("/", createIngresso);

export default router;
