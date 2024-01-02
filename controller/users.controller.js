var Users = require('../models/users.model');
const Public = require('../public/public');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(8);

//Login Admin
module.exports.loginAdmin = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({email: email});
        if (!user) {
            res.status(401).json("Người dùng không tồn tại!");
            return
        }
        const correctUser = bcrypt.compareSync(password, user.password) && (user.type === 'admin');
        if (correctUser) {
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token })
        } else {
            res.status(401).json("Email hoặc mật khẩu không chính xác!")
        }
    } catch (error) {
        res.status(500).json("Lỗi hệ thống")
    }
}

//Forgot password admin
module.exports.forgotPWAdmin = async function forgotPWAdmin(req, res ) {
    try {
        const user = await Users.findOne({ email: req.body.email , type: 'admin'});
        if (user) {
            const subject = "Cập nhật lại mật khẩu";
            const link = `https://admin-puncare.web.app/reset-password?_id=${user._id}`;
            const html = "<p>Bạn đã yêu cầu tạo lại mật khẩu, truy cập <a href='" + link + "'>đường dẫn này</a> để đổi lại mật khẩu của bạn</p>";
            const sendEmail = Public.sendEmails(req.body.email, subject, html);
            if (sendEmail) {
                res.status(201).json("Email khôi phục tài khoản sẽ được gửi đến email của bạn");
            } else {
                res.status(500).json("Lỗi hệ thống");
            }
        } else {
            res.status(400).json("Tài khoản không tồn tại");
        } 
    } catch (error) {
        res.status(500).json("Lỗi hệ thống");
    }
}

//Login
module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({email: email});
        if (!user) {
            res.status(401).json("Người dùng không tồn tại!");
            return
        }
        const correctUser = bcrypt.compareSync(password, user.password);
        if (correctUser) {
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token })
        } else {
            res.status(401).json("Mật khẩu không chính xác!");
        }
    } catch (error) {
        res.status(500).json('Lỗi hệ thống')
    }
}

//Logout
module.exports.logout = async function (req, res) {
    // Log user out of the application
    try {
        const { _id, token } = req.body;
        const currentUser = await Users.findOne({ _id: _id});
        currentUser.tokens = currentUser.tokens.filter((t) => t.token != token);
        await currentUser.save();
        res.json();
    } catch (error) {
        res.status(500).json("Lỗi hệ thống")
    }
}

//Update info user
module.exports.updateUser = async function (req, res) {
    try {
        var updateUser = await Users.findOneAndUpdate(req.params, req.body, { new: true });
        res.status(201).json(updateUser);
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }

}

//Update password user
module.exports.updatePassword = async function (req, res) {
    try {
        const user = await Users.findById(req.params._id);
        const correctUser = bcrypt.compareSync(req.body.password, user.password);
        if (correctUser) {
            const password = bcrypt.hashSync(req.body.newPassword, salt);
            var updateUser = await Users.findOneAndUpdate(req.params, { password: password }, { new: true });
            res.json(updateUser);
        } else {
            res.status(401).json("Mật khẩu cũ không chính xác");
        }
    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }

}

//Sign up
module.exports.create = async function (req, res) {
    try {
        const existedUser = await Users.findOne({email: req.body.email});
        if (existedUser) {
            res.status(400).json("Email đã tồn tại")
        } else {
            const user = await Users.create(req.body);
            res.status(201).json(user)
        }
    } catch (error) {
        res.status(500).json("Lỗi hệ thống")
    }
}

//Forgot password
module.exports.forgotPW = async function forgotPW(req, res ) {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            const subject = "Cập nhật lại mật khẩu";
            const link = `https://puncare-121061.web.app/reset-password?_id=${user._id}`;
            const html = "<p>Bạn đã yêu cầu tạo lại mật khẩu, truy cập <a href='" + link + "'>đường dẫn này</a> để đổi lại mật khẩu của bạn</p>";
            const sendEmail = Public.sendEmails(req.body.email, subject, html);
            if (sendEmail) {
                res.status(201).json("Email khôi phục tài khoản sẽ được gửi đến email của bạn");
            } else {
                res.status(500).json("Lỗi hệ thống");
            }
        } else {
            res.status(400).json("Tài khoản không tồn tại");
        } 
    } catch (error) {
        res.status(500).json("Lỗi hệ thống");
    }
}

module.exports.resetPW = async function resetPW(req, res) {
    try {
        const user = await Users.findById(req.params._id);
        if (user) {
            const password = bcrypt.hashSync(req.body.password, salt);
            var updateUser = await Users.findOneAndUpdate(req.params, { password: password }, { new: true });
            res.status(201).json(updateUser);
        } else {
            res.status(401).json("Người dùng không tồn tại");
        }
    } catch (error) {
        res.status(500).json("Lỗi hệ thống");
    }
}