import { Router } from 'express';
import Product from '../models/product.js';

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
});

router.get('/:pid', async (req, res) => {
  const product = await Product.findById(req.params.pid);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
});

router.put('/:pid', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(updated);
});

router.delete('/:pid', async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.pid);
  if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
});

export default router;
