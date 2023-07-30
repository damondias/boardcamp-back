import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customers.schemas.js";
import { postCustomer } from "../controllers/customers.controllers.js";

const customersRouter = Router();

customersRouter.post("/customers",validateSchema(customerSchema), postCustomer);

export default customersRouter;