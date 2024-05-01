const { ObjectId } = require('mongodb');

class UserService {
    constructor(client) {
        this.User = client.db().collection('users');
    }
        // name
        // "Nguyen Tan Phuoc"
        // email
        // "phuoc@gmail.com"
        // password
        // "phuocdzz"
        // phone
        // "01231422"
        // address
        // "HCM"

    async signUp(data) {
        const user = await this.User.findOne({ email: data.email });
        if (user) {
            return { message: 'Email already exists', isSignUp: false};
        }
        await this.User.insertOne(data);
        return { message: 'User created successfully', isSignUp: true};
        
    }

    async signIn(data) {
        const user = await this.User.findOne({ email: data.email, password: data.password });
        if (!user) {
            return { message: 'Invalid email or password', _id : '', isSignIn: false, name: ''};
        }
        return { message: 'login successful', _id : user._id, isSignIn: true, name: user.name};
    }

    async getUserWithId(id) {
        const user = await this.User.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
        return user;
    }

    async updateUserInfo(id, payload) {
        const user = await this.User.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
        if (!user) {
            return { message: 'User not found', isUpdate: false };
        }

        const updateData = {
            name: payload.name,
            phone: payload.phone,
            address: payload.address
        }

        await this.User.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
        return { message: 'User updated successfully', isUpdate: true};
    }

    async getNewestUser() {
        return await this.User.find().sort({ _id: -1 }).limit(1).toArray();
    }

}

module.exports = UserService;