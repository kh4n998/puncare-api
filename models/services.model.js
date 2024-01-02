var mongoose = require('mongoose');

var servicesSchema = new mongoose.Schema({
    time: String,
    title: { type: String, required: true },
    price: {type: String, default: '0'},
    about: String,
    image: { type: String, required: true },
    details: String,
    description: String, 
    currency: {type: String, default: 'VNĐ'},
});

var Services = mongoose.model('Services', servicesSchema);
module.exports = Services;