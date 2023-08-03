import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/login").post(validateLoginInput,login);

router.route("/register").post(validateRegisterInput,register);

export default router;
