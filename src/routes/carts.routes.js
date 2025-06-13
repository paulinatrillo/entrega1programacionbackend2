import { Router } from 'express';
import Cart from '../models/cart.js';

const router = Router();

router.post('/', async (req, res) => {
  const newCart = await Cart.create({});
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate('products.product');
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
  res.json(cart);
});

router.post('/:cid/products/:pid', async (req, res) => {
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
});

export default router;
