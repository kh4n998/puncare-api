var mongoose = require('mongoose');

var typeProductSchema = new mongoose.Schema({
    type_name: {
        type: String,
        required: true
    },
})

var Types = mongoose.model('Types', typeProductSchema);
module.exports = Types;