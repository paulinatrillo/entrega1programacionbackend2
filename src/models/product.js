import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  code: { type: String, unique: true, required: true },
  stock: { type: Number, default: 0 },
  category: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
