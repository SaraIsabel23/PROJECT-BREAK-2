// Product.js: Define la estructura y reglas de los productos en la base de datos.
const mongoose = require('mongoose');

const validCategory = ['Camisetas','Pantalones','Zapatos','Accesorios'];
const validSize     = ["XS","S","M","L","XL"];

const productSchema = new mongoose.Schema({
    name:        {type: String, required: true},
    description: {type: String, required: true},
    image:       {type: String, required: true},
    category:    {type: String, enum: validCategory, required:true},
    size:        {type: String, enum: validSize, required: true},
    price:       {type: Number, required: true}
});



module.exports = mongoose.model('Product', productSchema);
module.exports.validCategory = validCategory;
module.exports.validSize     = validSize;