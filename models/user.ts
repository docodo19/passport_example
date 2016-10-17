import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface IUser extends mongoose.Document {
    username: string,
    password: string,
}

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        set: function(v){
            return v.toLowerCase().trim();
        }
    },
    password: {
        type: String,
        required: true,
    }
});

// custom methods
userSchema.method('setPassword', function(password){
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(password, salt);
});

userSchema.method('validatePassword', function(password){
    return bcrypt.compareSync(password, this.password);
});

userSchema.method('generateToken', function(){
    return jwt.sign({
        id: this._id,
        username: this.username,
    }, 'SomeSecretKey');
});

export default mongoose.model<any>('User', userSchema);
