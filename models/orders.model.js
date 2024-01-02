var mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema({
    note: String,
    payment: String,
    district: String,
    post_code: String,
    create_date: Number,
    city: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    items: { type: Array, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'created' },
    totalPrice: { type: Number, required: true },
});

var Orders = mongoose.model('Orders', ordersSchema);
module.exports = Orders;