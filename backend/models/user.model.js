import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    totalUsers: {type: Number, default: 0}
});

const User = mongoose.model('User', userSchema);

export default User;