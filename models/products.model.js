var mongoose = require('mongoose');

var productsSchema = new mongoose.Schema({
    rate: Number,
    price: { type: String, required: true },
    image: { type: String, required: true },
    amount: { type: Number, required: true },
    weight: String,
    details: String,
    quantity_sold: Number,
    title: {type: String, required: true}, 
    currency: {type: String, default: 'VNĐ'},
    type_id: { type: String, required: true },
    type_name: { type: String, required: true },
});

var Products = mongoose.model('Products', productsSchema);
module.exports = Products;