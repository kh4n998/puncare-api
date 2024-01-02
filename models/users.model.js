const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var salt = bcrypt.genSaltSync(8);

var userSchema = new mongoose.Schema({
    city: String,
    phone: String,
    avatar: String,
    address: String,
    district: String,
    password: { type: String,  required: true },
    type: { type: String, default: 'customer' },
    tokens: [{ token: { type: String, required: true } }],
    name: { type: String,  required: true, minLength: 5 }, 
    email: { type: String, lowercase: true, unique: true, required: true },
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hashSync(user.password, salt);
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await Users.findOne({ email: email })
    if (!user) {
        return;
    }
    const isPasswordMatch = await bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
        return;
    }
    return user;
}

var Users = mongoose.model('User', userSchema);
module.exports = Users;