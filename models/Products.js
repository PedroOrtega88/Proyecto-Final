const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: {
        type: String,
        enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"]
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL']
    },
    price: Number
});



const Products = mongoose.model('Products', ProductSchema);
module.exports = Products;
