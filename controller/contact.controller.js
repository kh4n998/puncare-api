var Contacts = require('../models/contact.model');
const Public = require('../public/public');

//Fetch data (get / filter)
module.exports.get = async function (req, res) {
    try {
        var end_date = parseInt(req.query.end_date) || Date.parse(new Date);
        var start_date = parseInt(req.query.start_date) || 0;
        var page = parseInt(req.query.page) || 1;
        var page_size = parseInt(req.query.page_size) || 15;
        let filterParams = {};
        let contacts;
        if (req.query.name) {
            filterParams = {
                ...filterParams,
                name: { $regex: '.*' + req.query.name || '' + '.*' }
            };
        }
        if (req.query.service_id) {
            filterParams = {
                ...filterParams,
                service_id: req.query.service_id,
            };
        }
        var contactsFilter = await Contacts.find(filterParams).where(req.query.sort).gte(start_date).lte(end_date);
        contacts = Public.pagination(contactsFilter, page, page_size);
        if (req.query.sort && req.query.dir) {
            contacts = {
                ...contacts,
                data: Public.sort_by_key(contacts.data, req.query.sort, req.query.dir)
            };
        }
        res.json(contacts);
    } catch (error) {
        res.status(500).json("Lỗi hệ thống");
    }
}

// Create contacts
module.exports.create = async function (req, res) {
    try {
        var body = {
            ...req.body,
            create_date: Date.parse(new Date()),
        }
        var createContact = await Contacts.create(body);
        const subject = "Tin nhắn xác nhận đặt lịch hẹn với Pun Care";
        const html = "<p>Cảm ơn quý khách đã lựa chọn dịch vụ của Pun Care!</p><p>Chúng tôi gửi thông báo này để xác nhận lịch hẹn với quý khách vào ngày " + new Date(req.body.date_visit).toLocaleDateString("vi-VN") + ", về dịch vụ " + req.body.service_name +"</p><p>Thắc mắc xin liên hệ: 0386624545</p>";
        const sendEmail = Public.sendEmails(req.body.email, subject, html);
        if (sendEmail) {
            res.status(201).json(createContact);
        } else {
            res.status(500).json("Lỗi hệ thống");
        }
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//Remove contact
module.exports.deleteContact = async function (req, res) {
    try {
        var removedContact = await Contacts.findByIdAndDelete(req.params);
        res.json(removedContact);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
}