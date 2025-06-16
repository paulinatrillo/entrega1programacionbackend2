import Cart from '../models/cart.js';

class CartRepository {
  async create() {
    return await Cart.create({ products: [] });
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

  async removeProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    const index = cart.products.findIndex(p => p.product.toString() === productId);
    if (index === -1) return null;

    cart.products[index].quantity = quantity;
    await cart.save();
    return cart;
  }

  async emptyCart(cartId) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart;
  }
}

export default new CartRepository();
