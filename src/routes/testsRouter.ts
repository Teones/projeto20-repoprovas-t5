import { Router } from "express";

import * as middlewares from "../middlewares/testsMiddlewares.js"
import * as controller from "../controllers/testsController.js"

const testsRouter = Router();
testsRouter.post("/tests", middlewares.validateSignUp, controller.create);

export default testsRouter;