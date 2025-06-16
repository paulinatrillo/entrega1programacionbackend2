import { Router } from 'express';
import CartRepository from '../repositories/cartRepository.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const newCart = await CartRepository.create();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear carrito', error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartRepository.findById(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener carrito', error: error.message });
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await CartRepository.addProduct(req.params.cid, req.params.pid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto al carrito', error: error.message });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await CartRepository.removeProduct(req.params.cid, req.params.pid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
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

    const cart = await CartRepository.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    if (!cart) return res.status(404).json({ message: 'Carrito o producto no encontrado' });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cantidad', error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const cart = await CartRepository.emptyCart(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al vaciar carrito', error: error.message });
  }
});

export default router;
