import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customers.schemas.js";
import { getCustomer, getCustomers, postCustomer } from "../controllers/customers.controllers.js";

const customersRouter = Router();

customersRouter.post("/customers",validateSchema(customerSchema), postCustomer);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);



export default customersRouter;