import { Router } from "express";
import gamesRouter from "./games.routes.js";

const router = Router();

router.use(gamesRouter);

router.get("/", (req, res) => res.send("API Boardcamp") );

export default router;