import Producto from '../models/productos.model.js';

async function createProduct(req, res) {
    try {
        const { nombre, stock, categoria, codigoBarras } = req.body;
        const newProduct = new Producto({ nombre, stock, categoria, codigoBarras });
        await newProduct.save();
        res.status(201).json({ message: "Producto añadido exitosamente", producto: newProduct});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await Producto.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getOneProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Producto.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { nombre, stock, categoria, codigoBarras } = req.body;
        const updatedProduct = await Producto.findByIdAndUpdate(id, { nombre, stock, categoria, codigoBarras }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto actualizado exitosamente", producto: updatedProduct});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Producto.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(204).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct };
