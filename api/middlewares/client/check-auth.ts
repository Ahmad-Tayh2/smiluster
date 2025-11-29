const jwt = require("jsonwebtoken");
import { TOKEN_SECRET_KEY } from "../../config";
import { User, License, models } from "../../models";

module.exports = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
        req.userID = decoded.userID;
        const user = await User.findOne({
            where: { userID: decoded.userID },
            include: {
                model: models.License,
            },
            attributes: {
                exclude: ["password"],
            },
        });
        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Un-authorized access",
                token: req.headers.authorization,
            });
        }
        req.user = user.toJSON();
        req.license = req.user.License;
        next();
    } catch (error: any) {
        return res.status(401).json({
            error: true,
            message: "Un-authorized access",
            e: error,
            token: req.headers.authorization,
        });
    }
};
