// prodcutController.js: Muestra todos los productos al público. Solo pueden verlos.
const Product  = require('../models/Product');
const baseHtml = require('../helpers/baseHtml');
const getNavBar =require('../helpers/getNavBar');
const getProductCards = require('../helpers/getProductCards');
const productsTemp    = require('../data/productsTemp');


const publicControllers = {
    showProducts: async (req, res) => {
        try{
            const category = req.query.category;
            let products;

            if (category) {
               products = productsTemp.filter(p => p.category === category);
            } else {
               products = productsTemp;
            }                   /*await Product.find();ponerlo cuando funcione mongoDB--products = await Product.find({ category: category });*/
            const productCards = getProductCards(products);
            const html = baseHtml(getNavBar() + productCards);
            res.send(html);

            
        }catch(error) {
            console.error(error);
            res.status(500).json("Error")
        }
    },
    showProductById: async (req, res) => {
        try{
            const productId = req.params.productId;
            const product = productsTemp.find(p => p._id === productId);  /*await Product.findById(productId);ponerlo cuando funcione mongoDB*/
            const detail  = `
            <div class="product-detail">
               <h2>${product.name}</h2>
               <img src="${product.image}" alt="${product.name}">
               <p>Categoria: ${product.category}</p>
               <p>${product.description}</p>
               <p>Talla: ${product.size}</p>
               <p>${product.price}€</p>
               <a href="/products">Volver</a>
            </div>
            `
            const html = baseHtml(getNavBar() + detail)
            res.send(html);

        }catch(error) {
            console.error(error);
            res.status(500).json("Error")
        }
    }
};

module.exports = publicControllers;
