// dashboardController.js: Gestiona qué hacer con los productos cuando llega una petición (crear, leer, actualizar, borrar).

const Product            = require('../models/Product');
const baseHtml           = require('../helpers/baseHtml');
const getDashboardCards  = require('../helpers/getDashboardCards');
const productsTemp       = require('../data/productsTemp');
const getDashboardNavBar = require('../helpers/getDashboardNavBar');


const dashboardControllers = {
    showProducts: async (req, res) => {
        try{
            const category = req.query.category;
            let products;

            if(category) {
                products = productsTemp.filter(p => p.category === category);
            } else {
                products = productsTemp;
            }                     /*await Product.find();ponerlo cuando funcione mongoDB--products = await Product.find({ category: category });*/
            const productCards = getDashboardCards(products);
            const html = baseHtml(getDashboardNavBar() + productCards);
            res.send(html);

        } catch(error) {
            console.error(error);
            res.status(500).json("Error")
        }
    },
    showProductById: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product   = productsTemp.find(p => p._id === productId);
            if(!product) {
                return res.status(404).send(baseHtml(getDashboardNavBar() + '<h2>Producto no encontrado</h2>'))
            };
            const detail    = `
            <div class="product-detail">
               <h2>${product.name}</h2>
               <img src="${product.image}" alt="${product.name}">
               <p>Categoria: ${product.category}</p>
               <p>${product.description}</p>
               <p>Talla: ${product.size}</p>
               <p>${product.price}€</p>
               <a href="/dashboard/${product._id}/edit">Editar</a>
               <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
                 <button type="submit">Eliminar</button>
               </form>
               <a href="/dashboard">Volver</a>
            </div>
            `
            const html = baseHtml(getDashboardNavBar() + detail)
            res.send(html);
        } catch(error) {
            console.error(error);
            res.status(500).json("Error")
        }
    },
    showNewProduct: async (req, res) => {
        try {
            const form = `
               <h2>Nuevo producto</h2>
               <form action="/dashboard" method="POST">
                  <label>Nombre:</label>
                  <input type="text" name="name" required>
               
                  <label>Descripcion:</label>
                  <input type="text" name="description" required>
               
                  <label>Precio:</label>
                  <input type="number" name="price" required>
               
                  <label>Imagen:</label>
                  <input type="text" name="image" required>

                  <label>Categoria:</label>
                  <select name="category" required>
                     <option value="Camisetas">Camisetas</option>
                     <option value="Pantalones">Pantalones</option>
                     <option value="Zapatos">Zapatos</option>
                     <option value="Accesorios">Accesorios</option>
                  </select>                
                  <label>Talla:</label>
                  <select name="size" required>
                     <option value="XS">XS</option>
                     <option value="S">S</option>
                     <option value="M">M</option>
                     <option value="L">L</option>
                     <option value="XL">XL</option>
                  </select>
                
                  <button type="submit">Crear</button>
               </form>
               `
               const html = baseHtml(getDashboardNavBar() + form);
               res.send(html);

        } catch(error) {
            console.error(error);
            res.status(500).json("Error")
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
            productsTemp.push(newProduct);  //const product = await Product.create(req.body);
            res.redirect('/dashboard');     //res.redirect('/dashboard'); MODIFICAR CUANDO TENGA MONGO DB
        
        } catch(error) {
            console.error(error);
            res.status(500).json("Error");
        }
    },
    showEditProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product   = productsTemp.find(p => p._id === productId);
            if(!product) {
                return res.status(404).send(baseHtml(getDashboardNavBar() + '<h2>Producto no encontrado</h2>'))
            };
            const form      = `
               <h2>Editar producto</h2>
               <form action="/dashboard/${product._id}?_method=PUT" method="POST">
                  <label>Nombre:</label>
                  <input type="text" name="name" value="${product.name}" required>
               
                  <label>Descripcion:</label>
                  <input type="text" name="description" value="${product.description}" required>
               
                  <label>Precio:</label>
                  <input type="number" name="price" value="${product.price}" required>
               
                  <label>Imagen:</label>
                  <input type="text" name="image" value="${product.image}" required>

                  <label>Categoria:</label>
                  <select name="category" required>
                     <option value="Camisetas" ${product.category === 'Camisetas' ? 'selected': ''}>Camisetas</option>
                     <option value="Pantalones" ${product.category === 'Pantalones' ? 'selected': ''}>Pantalones</option>
                     <option value="Zapatos" ${product.category === 'Zapatos' ? 'selected': ''}>Zapatos</option>
                     <option value="Accesorios" ${product.category === 'Accesorios' ? 'selected': ''}>Accesorios</option>
                  </select>
               
                  <label>Talla:</label>
                  <select name="size" required>
                     <option value="XS" ${product.size === 'XS' ? 'selected': ''}>XS</option>
                     <option value="S" ${product.size === 'S' ? 'selected': ''}>S</option>
                     <option value="M" ${product.size === 'M' ? 'selected': ''}>M</option>
                     <option value="L" ${product.size === 'L' ? 'selected': ''}>L</option>
                     <option value="XL" ${product.size === 'XL' ? 'selected': ''}>XL</option>
                  </select>

                  <button type="submit">Guardar cambios</button>
               </form>
                  `;
            const html = baseHtml(getDas() + form);
            res.send(html);

        } catch(error) {
            console.log(error);
            res.status(500).json("Error");
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productId    = req.params.productId;
            const productIndex = productsTemp.findIndex(p => p._id === productId);
            if(productIndex === -1) {
                return res.status(404).send(baseHtml(getDashboardNavBar() + '<h2>Producto no encontrado</h2>'))
            };
            
            productsTemp[productIndex] = {
                _id: productId,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                category: req.body.category,
                size: req.body.size
            };                   //await Product.findByIdAndUpdate(productId, req.body); CAMBIAR CON MONGO DB

            res.redirect("/dashboard");

        } catch(error) {
            console.log(error);
            res.status(500).json("Error");
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId    = req.params.productId;
            const productIndex = productsTemp.findIndex(p => p._id === productId);
            if(productIndex === -1) {
                return res.status(404).send(baseHtml(getDashboardNavBar() + '<h2>Producto no encontrado</h2>'))
            };
            
            productsTemp.splice(productIndex, 1); //await Product.findByIdAndDelete(productId); DOS ULTIMAS LINEAS MODIFICAR CON MONGO DB

            res.redirect("/dashboard");
        } catch(error) {
            console.log(error);
            res.status(500).json("Error")
        }
    }
};

module.exports = dashboardControllers;


