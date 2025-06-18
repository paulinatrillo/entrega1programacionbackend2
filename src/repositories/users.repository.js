import User from '../models/user.js';

class UserRepository {
  async create(data) {
    return await User.create(data);
  }

  async findByEmail(email) {
    return await User.findOne({ email }).populate('cart');
  }

  async findById(id) {
    return await User.findById(id).populate('cart');
  }

  async updatePassword(id, newPassword) {
    const user = await User.findById(id);
    if (!user) return null;
    user.password = newPassword;
    await user.save();
    return user;
  }
}

export default new UserRepository();
