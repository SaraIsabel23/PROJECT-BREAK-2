
const Product = require('../models/Product');

const apiController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find()
            res.status(200).json(products);
        } catch(error) {
            console.error(error);
            res.status(500).json({message: "Error del servidor"});
        }
    },
    getProductById: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product   = await Product.findById(productId);
            if(!product) {
                return res.status(404).json({message: "Producto no encontrado"});
            }
            res.status(200).json(product);
        } catch(error) {
            console.error(error);
            res.status(500).json({message:"Error del servidor"});
        }
    },
    createProduct: async (req, res) => {
        try {
            const newProduct = await Product.create(req.body);
            res.status(201).json(newProduct);

        } catch(error) {
            console.error(error);
            res.status(500).json({message:"Error del servidor"});
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product   = await Product.findByIdAndUpdate(
                productId,
                req.body,
                { new: true }
            );
            if(!product) {
                return res.status(404).json({message:"Producto no encontrado"});
            }
            res.status(200).json(product);

        } catch(error) {
            console.error(error);
            res.status(500).json({message:"Error del servidor"});
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product   = await Product.findByIdAndDelete(productId);
            if(!product) {
                return res.status(404).json({message:"Producto no encontrado"});
            }
            res.status(200).json({message:"Producto eliminado"});

        } catch(error) {
            console.error(error);
            res.status(500).json({message:"Error del servidor"});
        }
    }
};

module.exports = apiController;