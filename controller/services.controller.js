var Services = require('../models/services.model');
const Public = require('../public/public');

//Fetch data (get / filter)
module.exports.get = async function (req, res) {
    try {
        let queries = {};
        let services;
        if (req.query.title) {
            queries = {
                ...queries,
                title: {$regex: '.*' + req.query.title || '' + '.*'}
            };
        }
        var page = parseInt(req.query.page) || 1;
        var page_size = parseInt(req.query.page_size) || 15;
        var servicesFilter = await Services.find(queries);
        services = Public.pagination(servicesFilter, page, page_size)
        if (req.query.sort && req.query.dir) {
            services = {
                ...services,
                data: Public.sort_by_key(services.data, req.query.sort, req.query.dir)
            };
        }
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//View details service
module.exports.detailsService = async function (req, res) {
    try {
        var detailsService = await Services.findById(req.params._id);
        res.status(200).json(detailsService);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//Remove service
module.exports.deleteService = async function (req, res) {
    try {
        var removedServices = await Services.findByIdAndDelete(req.params);
        res.json(removedServices);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//Update service
module.exports.updateServices = async function (req, res) {
    try {
        var updateService = await Services.findOneAndUpdate(req.params, req.body, { new: true });
        res.status(200).json(updateService);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//Add service
module.exports.create = async function (req, res) {
    try {
        var createService = await Services.create(req.body);
        res.status(201).json(createService);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}