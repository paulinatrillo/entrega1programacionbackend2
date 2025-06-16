import { Router } from 'express';
import productRepository from '../repositories/productRepository.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query;
    const products = await productRepository.getAll({ limit, page, sort, category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await productRepository.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await productRepository.getById(req.params.pid);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar producto', error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updated = await productRepository.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const deleted = await productRepository.delete(req.params.pid);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
});

export default router;
