// prodcutController.js: Muestra todos los productos al público. Solo pueden verlos.

const Product         = require('../models/Product');
const baseHtml        = require('../helpers/baseHtml');
const getNavBar       = require('../helpers/getNavBar');
const getProductCards = require('../helpers/getProductCards');


const publicControllers = {
    showProducts: async (req, res) => {
        try{
            const category = req.query.category;
            let products;

            if (category) {
               products = await Product.find({ category: category});
            } else {
               products = await Product.find();
            }                   
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
            const product   = await Product.findById(productId)
            const detail    = `
            <div class="product-detail">
               <h2>${product.name}</h2>
               <img src="${product.image}" alt="${product.name}">
               <p>Categoria: ${product.category}</p>
               <p>${product.description}</p>
               <p>Talla: ${product.size}</p>
               <p>${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}€</p>
               <a href="/products" class="btn-volver">Volver</a>
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
