const express = require('express');
const {
  createIntoDB,
  findPortfolioToDB,
  findSinglePortfolioToDB,
  updateByIdToDB,
} = require('./controller');

const router = express.Router();

router.post('/', createIntoDB).get('/', findPortfolioToDB);
router.get('/:id', findSinglePortfolioToDB);
router.put('/:id', updateByIdToDB);
module.exports = router;
