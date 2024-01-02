var Type = require('../models/typeProduct.model');

module.exports.createType = async function (req, res) {
    try {
        var createProduct = await Type.create(req.body);
        res.json(createProduct);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

module.exports.getType = async function (req, res) {
    try {
        var types = await Type.find();
        res.json(types);
    } catch (error) {
        res.status(500).json("Lỗi hệ thống");
    }
}