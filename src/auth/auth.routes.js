import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validInputs } from "../middlewares/valid-inputs.js";

const router = Router();

router.post(
    '/login',
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password required').not().isEmpty(),
        validInputs,
    ],
    login
);

export default router;
