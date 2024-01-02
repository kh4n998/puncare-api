var mongoose = require('mongoose');

var contactsSchema = new mongoose.Schema({
    msg: String,
    service_id: String,
    service_name: String,
    time_visit: String,
    date_visit: Number,
    create_date: Number,
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
});

var Contacts = mongoose.model('Contacts', contactsSchema);
module.exports = Contacts;