var Orders = require('../models/orders.model');
var Products = require('../models/products.model');
const Public = require('../public/public');

//Fetch data (get / filter)
module.exports.get = async function (req, res) {
    try {
        var end_date = req.query.end_date || Date.parse(new Date);
        var start_date = req.query.start_date || 0;
        var page = parseInt(req.query.page) || 1;
        var page_size = parseInt(req.query.page_size) || 15;
        let filterParams = {};
        let orders;
        if (req.query.name) {
            filterParams = {
                ...filterParams,
                name: { $regex: '.*' + req.query.name || '' + '.*' }
            };
        }
        if (req.query.status) {
            filterParams = {
                ...filterParams,
                status: req.query.status,
            };
        }
        var ordersFilterDate = await Orders.find(filterParams).where('create_date').gte(start_date).lte(end_date);
        orders = Public.pagination(ordersFilterDate, page, page_size);
        if (req.query.sort && req.query.dir) {
            orders = {
                ...orders,
                data: Public.sort_by_key(orders.data, req.query.sort, req.query.dir)
            };
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json("Lỗi hệ thống");
    }
}

// Create order
module.exports.create = async function (req, res) {
    try {
        var body = {
            ...req.body,
            create_date: Date.parse(new Date()),
        }
        var createOrder = await Orders.create(body);
        req.body.items.forEach(product => {
            updateQuantitySold(product);
        });
        res.status(201).json(createOrder);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

async function updateQuantitySold(product) {
    const selectedProduct = await Products.findById(product._id);
    if (selectedProduct) {
        const quantity_sold = selectedProduct.quantity_sold + product.quantity;
        await Products.findOneAndUpdate({ _id: product._id }, { quantity_sold: quantity_sold })
    }
}

// Update status order
module.exports.updateStatus = async function (req, res) {
    try {
        var order = await Orders.findById(req.params._id);
        var updateOrder = await Orders.findOneAndUpdate(req.params, { status: 'shipped' }, { new: true });
        order.items.forEach(product => {
            updateAmount(product);
        });
        res.json(updateOrder);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

async function updateAmount(product) {
    const selectedProduct = await Products.findById(product._id);
    if (selectedProduct) {
        const amount = selectedProduct.amount - product.quantity;
        await Products.findOneAndUpdate({ _id: product._id }, { amount: amount })
    }
}

// Delete Order
module.exports.deleteOrder = async function (req, res) {
    try {
        var removedOrder = await Orders.findByIdAndDelete(req.params);
        res.json(removedOrder);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}