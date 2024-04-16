import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bycript from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userFound = await User.findOne({ email });

        if (userFound) 
            return res.status(400).json({ 
                message: ["El usuario ya existe"],
        });

        const passwordHash = await bycript.hash(password, 10);
        
        const newUser = new User({
            username,
            email, 
            password: passwordHash,
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({
            id: userSaved._id,
        });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        res.json({ 
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound)
            return res.status(400).json({ 
                message: ["El usuario no existe"],
        });

        const isMatch = await bycript.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(400).json({
                message: ["Contraseña incorrecta"],
            });
        }

        const token = await createAccessToken({
            id: userFound._id,
            username: userFound.username,
        });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        res.json({
            message: ["Login correcto"],
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            password: userFound.password,
            token: token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/* SI EN ALGÚN MOMENTO TIENES PROBLEMAS CHECA ESTE, EN EL TRY */
export const verifyToken = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.send(false);

        jwt.verify(token, TOKEN_SECRET,async (error, user) => {
            if(error) return res.status(401);
            
            const userFound = await User.findById(user.id);
            if (!userFound) return res.sendStatus(401);

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
};


export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    return res.sendStatus(200);
}