import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo'],
        max: [1000, 'El stock no puede ser mayor a 1000']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true,
    },
    codigoBarras: {
        type: String,
        required: [true, 'El Código de barras es obligatorio'],
        trim: true,
        
    }
}, { timestamps: true },
    {
        collection: "productos"
    }
);

export default mongoose.model("Producto", productoSchema)