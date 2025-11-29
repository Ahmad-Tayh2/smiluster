import { Request, Response } from "express";
import { login } from "../../services/Auth/login";
import { TOKEN_SECRET_KEY } from "../../config";
const jwt = require("jsonwebtoken");

// create Token
const createToken = (userID: number) => {
    return jwt.sign({ userID }, TOKEN_SECRET_KEY);
};

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "All fields must be filled" });
        }
        const user = await login(email, password);
        if (!user) {
            return res.status(400).json("something went wrong");
        }
        const token = createToken(user.userID);

        // const userWithoutPassword: Partial<typeof user> = { ...user };
        // delete userWithoutPassword.password;
        const cleanUser = user.toJSON();
        delete cleanUser.password;

        res.status(200).json({ user: cleanUser, token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
