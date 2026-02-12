
const Product      = require('../models/Product');
const productsTemp = require('../data/productsTemp');

const apiController = {
    getProducts: async (req, res) => {
        try {
            const products = productsTemp;
            res.status(200).json(products);
        } catch(error) {
            console.error(error);
            res.status(500).json({message: "Error del servidor"});
        }
    },
    getProductById: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product   = productsTemp.find(p => p._id === productId);
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
            const newProduct = {
                _id: Date.now().toString(),
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                category: req.body.category,
                size: req.body.size
            };
            productsTemp.push(newProduct);//const product = await Product.create(req.body);
            res.status(201).json(newProduct);

        } catch(error) {
            console.error(error);
            res.status(500).json({message:"Error del servidor"});
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const productIndex = productsTemp.findIndex(p => p._id === productId);
            if(productIndex === -1) {
                return res.status(404).json({message:"Producto no encontrado"});
            }
            
            productsTemp[productIndex] = {
                _id: productId,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                category: req.body.category,
                size: req.body.size
            };            //await Product.findByIdAndUpdate(productId, req.body); CAMBIAR CON MONGO DB
            
            res.status(200).json(productsTemp[productIndex]);

        } catch(error) {
            console.error(error);
            res.status(500).json({message:"Error del servidor"});
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const productIndex = productsTemp.findIndex(p => p._id === productId);
            if(productIndex === -1) {
                return res.status(404).json({message:"Producto no encontrado"});
            }
            productsTemp.splice(productIndex, 1)//await Product.findByIdAndDelete(productId); DOS ULTIMAS LINEAS MODIFICAR CON MONGO DB
            res.status(200).json({message:"Producto eliminado"});

        } catch(error) {
            console.error(error);
            res.status(500).json({message:"Error del servidor"});
        }
    }
};

module.exports = apiController;