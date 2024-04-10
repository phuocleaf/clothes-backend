const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    extractProductData(req) {
        const product = {
            name: req.body.name,
            //desc: req.body.desc,
            price:  parseInt(req.body.price, 10),
            size_l: parseInt(req.body.size_l, 10),
            size_m: parseInt(req.body.size_m, 10),
            size_s: parseInt(req.body.size_s, 10),
            size_xl: parseInt(req.body.size_xl, 10),
            image: req.file.originalname,
        };
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }

    async create(payload) {
        const product = this.extractProductData(payload);
        return await this.Product.insertOne(product);
    }

    async getProducts() {
        return await this.Product.find({}).toArray();
    }

    async getProductWithId(id) {
        return await this.Product.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async updateProduct(id, payload) {
        // Kiểm tra và xử lý giá trị null
        const payload_size_s = isNaN(payload.size_s) || payload.size_s === null ? 0 : payload.size_s;
        const payload_update_size_s = isNaN(payload.update_size_s) || payload.update_size_s === null ? 0 : parseInt(payload.update_size_s, 10);
        const payload_size_m = isNaN(payload.size_m) || payload.size_m === null ? 0 : payload.size_m;
        const payload_update_size_m = isNaN(payload.update_size_m) || payload.update_size_m === null ? 0 : parseInt(payload.update_size_m, 10);
        const payload_size_l = isNaN(payload.size_l) || payload.size_l === null ? 0 : payload.size_l;
        const payload_update_size_l = isNaN(payload.update_size_l) || payload.update_size_l === null ? 0 : parseInt(payload.update_size_l, 10);
        const payload_size_xl = isNaN(payload.size_xl) || payload.size_xl === null ? 0 : payload.size_xl;
        const payload_update_size_xl = isNaN(payload.update_size_xl) || payload.update_size_xl === null ? 0 : parseInt(payload.update_size_xl, 10);
    
        // Tính toán số lượng mới cho mỗi size
        const size_s = parseInt(payload_size_s) + parseInt(payload_update_size_s);
        const size_m = parseInt(payload_size_m) + parseInt(payload_update_size_m);
        const size_l = parseInt(payload_size_l) + parseInt(payload_update_size_l);
        const size_xl = parseInt(payload_size_xl) + parseInt(payload_update_size_xl);
    
        // Tạo đối tượng product mới
        const product = {
            name: payload.name,
            price: parseInt(payload.price, 10),
            size_s: size_s,
            size_m: size_m,
            size_l: size_l,
            size_xl: size_xl,
        };
    
        // Tạo filter để cập nhật sản phẩm
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
    
        // Thực hiện cập nhật sản phẩm
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: product },
            { returnDocument: "after" }
        );
    
        return result;
    }
        

    async deleteProduct(id) {
        return await this.Product.deleteOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }
}



module.exports = ProductService;