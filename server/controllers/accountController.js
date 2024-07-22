const Account = require('../models/Account');

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProductToAccount = async (req, res) => {
  const { accountId } = req.params;
  const { productId } = req.body;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.products.push({ product: productId });
    await account.save();

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeProductFromAccount = async (req, res) => {
  const { accountId, productId } = req.params;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.products = account.products.filter(product => product.product.toString() !== productId);
    await account.save();

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
