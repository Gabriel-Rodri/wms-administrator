const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Sale = require('../models/Sale');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await Cart.findOne() || new Cart();
    const cartItem = cart.items.find(item => item.product.toString() === productId);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const saleItems = [];
    let total = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      saleItems.push({ product: item.product, quantity: item.quantity });
      total += product.price * item.quantity;
    }

    const sale = new Sale({ items: saleItems, total });
    await sale.save();

    await cart.remove();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
