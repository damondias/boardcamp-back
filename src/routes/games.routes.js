import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/games.schemas.js";
import { getGames, postGame } from "../controllers/games.controllers.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateSchema(gameSchema), postGame);
gamesRouter.get("/games", getGames);

export default gamesRouter;