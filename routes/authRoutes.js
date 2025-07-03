import {Router} from "express";
import {authController} from "../controllers/authController.js";
import {check} from "express-validator";
import {authenticate} from "../middleware/authMIddleware.js";
import {roleMiddleware} from "../middleware/roleMiddleweare.js";

export const authRouter = Router();

authRouter.post('/registration',
    [
        check('username', "Username is required").notEmpty(),
        check('password', "Password length need to be more than 6 and less than 32").isLength({
            min: 6,
            max: 32
        })
    ], authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/users', [authenticate, roleMiddleware("ADMIN")], authController.getUsers)
