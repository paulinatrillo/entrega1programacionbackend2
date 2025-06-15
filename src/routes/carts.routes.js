import { Router } from 'express';
import Cart from '../models/cart.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear carrito', error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener carrito', error: error.message });
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const index = cart.products.findIndex(p => p.product.toString() === req.params.pid);

    if (index !== -1) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto al carrito', error: error.message });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto del carrito', error: error.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Cantidad inválida' });
    }

    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const index = cart.products.findIndex(p => p.product.toString() === req.params.pid);
    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado en carrito' });
    }

    cart.products[index].quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cantidad', error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al vaciar carrito', error: error.message });
  }
});

export default router;
