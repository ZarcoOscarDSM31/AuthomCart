import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";


export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("BD conectada");
    } catch (error) {
        console.log(error);
        console.log("Error al conectar la bd");
    }
}