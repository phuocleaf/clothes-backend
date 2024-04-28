const express = require('express');
const cors = require('cors');
const usersRouter = require("./app/routes/user.route");
const productsRouter = require("./app/routes/product.route");
const adminsRouter = require("./app/routes/admin.route");
const ordersRouter = require("./app/routes/order.route");

const ApiError = require('./app/api-error');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(
  {extended: true}
));


app.get('/', (req, res) => {
  res.json({message: 'welcome to clothes application'})
});

app.use('/api/admins', adminsRouter)
app.use('/api/users', usersRouter)
app.use('/api/products',productsRouter );
app.use('/api/orders', ordersRouter);

//get image /image/imagename
app.use('/api/image', express.static('uploads'));

app.use((req, res, next) => {
  return next(new ApiError(404, 'Resource Not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
