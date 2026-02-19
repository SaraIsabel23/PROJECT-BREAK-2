// dashboardController.js: Gestiona qué hacer con los productos cuando llega una petición (crear, leer, actualizar, borrar).

const Product            = require('../models/Product');
const baseHtml           = require('../helpers/baseHtml');
const getDashboardCards  = require('../helpers/getDashboardCards');
const getDashboardNavBar = require('../helpers/getDashboardNavBar');


const dashboardControllers = {
    showProducts: async (req, res) => {
        try{
            const category = req.query.category;
            let products;

            if(category) {
                products = await Product.find({ category: category});
            } else {
                products = await Product.find();
            }                     
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
            const product   = await Product.findById(productId);
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
               <p>${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}€</p>
               <a href="/dashboard/${product._id}/edit" class="btn-editar">Editar</a>
               <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" onsubmit="return confirm('¿Desea eliminar este articulo?')">
                 <button type="submit" class="btn-eliminar">Eliminar</button>
               </form>
               <a href="/dashboard" class="btn-volver">Volver</a>
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
               <form action="/dashboard" method="POST" class="form-container" enctype="multipart/form-data">
                  <label>Nombre:</label>
                  <input type="text" name="name" required>
               
                  <label>Descripcion:</label>
                  <input type="text" name="description" required>
               
                  <label>Precio:</label>
                  <input type="number" name="price" step="0.01" required>
               
                  <label>Imagen:</label>
                  <input type="file" name="image" accept="image/*" required>

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
                
                  <button type="submit" class="btn-crear">Crear</button>
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
            const productData =req.body;
            if (req.file) {
                productData.image = req.file.path;
            }
            await Product.create(productData);
            res.redirect('/dashboard');
        
        } catch(error) {
            console.error(error);
            res.status(500).json("Error");
        }
    },
    showEditProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product   = await Product.findById(productId);
            if(!product) {
                return res.status(404).send(baseHtml(getDashboardNavBar() + '<h2>Producto no encontrado</h2>'))
            };
            const form      = `
               <h2>Editar producto</h2>
               <form action="/dashboard/${product._id}?_method=PUT" method="POST" class="form-container" enctype="multipart/form-data">
                  <label>Nombre:</label>
                  <input type="text" name="name" value="${product.name}" required>
               
                  <label>Descripcion:</label>
                  <input type="text" name="description" value="${product.description}" required>
               
                  <label>Precio:</label>
                  <input type="number" name="price" value="${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}" step="0.01" required>
               
                  <label>Imagen:</label>
                  <input type="file" name="image" accept="image/*">

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

                  <button type="submit" class="btn-guardar">Guardar cambios</button>
               </form>
                  `;
            const html = baseHtml(getDashboardNavBar() + form);
            res.send(html);

        } catch(error) {
            console.log(error);
            res.status(500).json("Error");
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productId   = req.params.productId;
            const productData = req.body;
            if (req.file) {
                productData.image = req.file.path;
            }
            const product = await Product.findByIdAndUpdate(productId, productData);
            if(!product) {
                return res.status(404).send(baseHtml(getDashboardNavBar() + '<h2>Producto no encontrado</h2>'))
            };

            res.redirect("/dashboard");

        } catch(error) {
            console.log(error);
            res.status(500).json("Error");
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product   = await Product.findByIdAndDelete(productId);
            if(!product) {
                return res.status(404).send(baseHtml(getDashboardNavBar() + '<h2>Producto no encontrado</h2>'))
            };
            
            res.redirect("/dashboard");
        } catch(error) {
            console.log(error);
            res.status(500).json("Error")
        }
    }
};

module.exports = dashboardControllers;


