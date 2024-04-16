import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Algo está roto");
});

// Configuración de CORS
app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// RUTAS
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

export default app;