export function roleMiddleware(roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next()
        }

        try {
            const userRoles = req.user.roles
            if (!userRoles.every(role => userRoles.includes(roles))) {
                return res.status(403).json({message: "Forbidden"})
            }

            return next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Forbidden"})
        }
    }
}
