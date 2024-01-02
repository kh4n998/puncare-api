var Products = require('../models/products.model');
const Public = require('../public/public');

//Fetch data (get / filter)
module.exports.get = async function (req, res) {
    try {
        let queries = {};
        let products;
        if (req.query.title) {
            queries = {
                ...queries,
                title: {$regex: '.*' + req.query.title || '' + '.*'}
            };
        }
        if (req.query.type_id) {
            queries = {
                ...queries,
                type_id: req.query.type_id,
            };
        }
        var page = parseInt(req.query.page) || 1;
        var page_size = parseInt(req.query.page_size) || 15;
        var productsFilter = await Products.find(queries);
        products = Public.pagination(productsFilter, page, page_size)
        if (req.query.sort && req.query.dir) {
            products = {
                ...products,
                data: Public.sort_by_key(products.data, req.query.sort, req.query.dir)
            };
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//Update product
module.exports.updateProducts = async function (req, res) {
    try {
        var updateProducts = await Products.findOneAndUpdate(req.params, req.body, { new: true });
        res.status(200).json(updateProducts);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//View details service
module.exports.detailsProduct = async function (req, res) {
    try {
        var detailsProduct = await Products.findById(req.params._id);
        res.status(200).json(detailsProduct);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//Remove product
module.exports.deleteProduct = async function (req, res) {
    try {
        var removedProducts = await Products.findByIdAndDelete(req.params);
        res.json(removedProducts);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//Add product
module.exports.create = async function (req, res) {
    try {
        var createProduct = await Products.create(req.body);
        res.status(201).json(createProduct);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}