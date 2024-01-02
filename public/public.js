const nodemailer = require("nodemailer");

module.exports.sort_by_key = function sort_by_key(array, key, dir) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (dir == 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        } else if (dir == 'decr') {
            return ((y < x) ? -1 : ((y > x) ? 1 : 0));
        }
    });
}

module.exports.pagination = function pagination(array, page, per_page) {
    var start = (page - 1) * per_page;
    var end = page * per_page;
    return {
        data: array.slice(start, end),
        total: array.length
    };
}

module.exports.sendEmails = async function sendEmail(email, subject, html) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                name: 'Pun Care',
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PW,
            },
        });
        await transporter.sendMail({
            from: "Pun Care",
            to: email,
            subject: subject,
            html: html
        });
        return true;
    } catch (err) {
        return false;
    }

}
