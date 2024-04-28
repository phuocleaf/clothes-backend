const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
    }
    
    async create(payload) {
        try {
            if (!payload || typeof payload !== 'object') {
                throw new Error('Invalid payload');
            }
    
            const moment = require('moment');
            const currentTime = moment().format('DD-MM-YYYY HH:mm:ss');
            payload.created_at = currentTime;
            payload.status = 'Chờ xác nhận'
           
            const result = await this.Order.insertOne(payload);
    
            if (result && result.acknowledged) {
               
                const ProductService = require("../services/product.service");
                const product = new ProductService(MongoDB.client);
    
                for (const cartItem of payload.cartList) {
                    const productId = new ObjectId(cartItem._id); 
                    await product.updateProductQuantity(productId, cartItem.Size, cartItem.quantity);
                }
                return { message: 'Order created successfully', isOrder: true };
            }
        } catch (error) {
            console.error('Error creating order:', error);
            return { message: 'An error occurred while creating the order', isOrder: false };
        }
    }
    
    
    
    
    async getOrders() {
        try {
            const result = await this.Order.find().sort({ created_at: -1 }).toArray();
            return result;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('An error occurred while fetching orders');
        }
    }
    

    async getOrderWithId(id) {
        return await this.Order.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async getOrderWithUserId(id) {
        return await this.Order.find({ userId: id }).toArray();
    }

    async updateOrderStatus(id, status) {
        if (status === 'Đã huỷ') {
            const order = await this.getOrderWithId(id);
            const ProductService = require("../services/product.service");
            const product = new ProductService(MongoDB.client);
            for (const cartItem of order.cartList) {
                const productId = new ObjectId(cartItem._id);
                await product.updateProductQuantity(productId, cartItem.Size, -cartItem.quantity);
            }
        }
        const result = await this.Order.updateOne({ _id: new ObjectId(id) }, { $set: { status: status } }); 
        if (result && result.acknowledged) {
            return { message: 'Trạng thái đã được cập nhật', isOrder: true };
        } else {
            return { message: 'Có lỗi xảy ra', isOrder: false };
        }
    }

    async getOrderListUsingUserId(id) {
        const result = await this.Order.find({ userId: id }).toArray();
        if (result) {
            const formattedOrders = result.map(order => ({
                _id: order._id,
                total: order.total,
                userAddress: order.userAddress,
                userName: order.userName,
                userNote: order.userNote,
                userPhone: order.userPhone,
                create_at: order.create_at,
                status: order.status
            }));
            return formattedOrders;
        } else {
            return [];
        }
    }
    
}



module.exports = OrderService;