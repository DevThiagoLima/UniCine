import express from "express";
import cors from "cors";
import filmesRouter from "./routes/filmes";
import salasRouter from "./routes/salas";
import sessoesRouter from "./routes/sessoes";
import reservasTempRouter from "./routes/reservas_temporarias";
import ingressosRouter from "./routes/ingressos";
import { startCleanupJob } from "./services/reservasTempService";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/filmes", filmesRouter);
app.use("/salas", salasRouter);
app.use("/sessoes", sessoesRouter);
app.use("/reservas-temporarias", reservasTempRouter);
app.use("/ingressos", ingressosRouter);

app.get("/health", (_, res) => {
  res.json({ ok: true });
});

startCleanupJob();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`server:${port}`);
});
