import { Router } from "express";
import gamesRouter from "./games.routes.js";
import customersRouter from "./customers.routes.js";

const router = Router();

router.use(gamesRouter);
router.use(customersRouter);

router.get("/", (req, res) => res.send("API Boardcamp") );

export default router;