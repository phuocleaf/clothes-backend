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
            return { message: 'Email already exists' };
        }
        await this.User.insertOne(data);
        return { message: 'User created successfully' };
        
    }

    async signIn(data) {
        const user = await this.User.findOne({ email: data.email, password: data.password });
        if (!user) {
            return { message: 'Invalid email or password' };
        }
        return { message: 'login successful', _id : user._id};
    }

   
   

}



module.exports = UserService;