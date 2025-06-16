import Product from '../models/product.js';

class ProductRepository {
  async create(productData) {
    return await Product.create(productData);
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async getAll({ limit = 10, page = 1, sort, category }) {
    const query = category ? { category } : {};
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
    };

    // Si tenés el plugin mongoose-paginate-v2
    if (Product.paginate) {
      return await Product.paginate(query, options);
    }

    // Si NO tenés mongoose-paginate-v2 (versión simple)
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort(options.sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return {
      docs: products,
      totalDocs: total,
      limit,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async update(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductRepository();
