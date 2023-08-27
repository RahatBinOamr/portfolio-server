const Portfolio = require('./mode');

exports.createIntoDB = async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);

    console.log(portfolio);
    const savedPortfolio = await portfolio.save();
    res.json({
      status: 'success',
      data: savedPortfolio,
      message: 'portfolio added successfully',
    });
  } catch (error) {
    res.json({
      status: 'false',
      error: error.message,
      message: 'Something went wrong!!!',
    });
  }
};
exports.findPortfolioToDB = async (req, res) => {
  const { search, category, page, limit } = req.query;
  const query = {};
  if (search) {
    query['$or'] = [
      { title: { $regex: search.toString(), $options: 'i' } },
      { author: { $regex: search.toString(), $options: 'i' } },
      { category: { $regex: search.toString(), $options: 'i' } },
    ];
  }
  if (category) {
    query['category'] = category.toString() || 'portfolio is not found ';
  }
  const sortField = req.query.sortField || 'createdAt';
  const sortOrder = req.query.sortOrder === 'desc' ? 'asc' : 'desc';
  try {
    const portfolio = await Portfolio.find(query)

      .sort({ [sortField]: sortOrder })
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1));
    const totalPortfolio = await Portfolio.countDocuments(query);
    res.json({
      portfolio: portfolio,
      currentPage: Number(page),
      totalPages: Math.ceil(totalPortfolio / Number(limit)),
    });
  } catch (error) {
    res.json({
      status: 'false',
      error: error.message,
      message: 'Something went wrong!!!',
    });
  }
};
exports.findSinglePortfolioToDB = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      res.json({
        status: 'false',
        message: 'Something went wrong!!!',
      });
    }
    res.json({
      status: 'success',
      data: portfolio,
      message: 'portfolio find successfully',
    });
  } catch (error) {
    res.json({
      status: 'false',
      error: error.message,
      message: 'Something went wrong!!!',
    });
  }
};
exports.updateByIdToDB = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updated = await Portfolio.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updated) {
      return res.json({
        status: 'false',
        message: 'Something went wrong!!!',
      });
    }

    res.json({
      status: 'success',
      data: updated,
      message: 'portfolio updated successfully',
    });
  } catch (error) {
    res.json({
      status: 'false',
      error: error.message,
      message: 'Something went wrong!!!',
    });
  }
};
