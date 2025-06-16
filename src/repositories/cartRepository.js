import Cart from '../models/cart.js';

class CartRepository {
  async create() {
    return await Cart.create({});
  }

  async findById(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async addProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    const index = cart.products.findIndex(p => p.product.toString() === productId);
    if (index !== -1) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
  }
}

export default new CartRepository();
