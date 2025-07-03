import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(401).json({message: "Unauthorized"})
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: "Unauthorized"})
    }
}
