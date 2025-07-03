import {Role} from "../models/Role.js";
import {User} from "../models/User.js";
import bcrypt from "bcryptjs"
import {validationResult} from "express-validator";
import {generateAccessToken} from "../utils/generateAccessToken.js";

class AuthController {
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "User not found"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: "Invalid password"})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).send({message: "Login error"})
        }
    }

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Validation error", errors})
            }
            const {username, password} = req.body

            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "User already exists"})
            }

            const userRole = await Role.findOne({value: "USER"})
            if (!userRole) {
                return res.status(400).json({message: "Role not found"})
            }

            const hashedPassword = await bcrypt.hash(password, 3)
            const user = new User({username, password: hashedPassword, roles: [userRole.value]})
            await user.save()
            return res.status(201).json({message: "User created"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async getUsers(req, res) {
        const roles = await Role.find()
        res.json(roles)
    }
}

export const authController = new AuthController();
