const Sale = require('../models/Sale');

exports.getDailySales = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$total" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMonthlySales = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$total" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};