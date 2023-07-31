import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.schema.js";
import { deleteRental, getrentals, postRental, returnGame } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentalSchema), postRental);
rentalsRouter.get("/rentals", getrentals);
rentalsRouter.post("/rentals/:id/return", returnGame);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;