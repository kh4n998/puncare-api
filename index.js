require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Router
const userApi = require('./routers/users.router');
const typeApi = require('./routers/types.router');
const orderApi = require('./routers/orders.router');
const contactApi = require('./routers/contact.router');
const productsApi = require('./routers/products.router');
const servicesApi = require('./routers/services.router');

app.use('/api/users', userApi);
app.use('/api/types', typeApi);
app.use('/api/orders', orderApi);
app.use('/api/contacts', contactApi);
app.use('/api/products', productsApi);
app.use('/api/services', servicesApi);

app.listen(process.env.PORT);