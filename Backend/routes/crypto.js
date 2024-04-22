const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:coinId/market_chart', async (req, res, next) => {
    try {
      const coinId = req.params.coinId;
      const params = req.query;
  
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
        params,
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching market chart data:', error);
      next(error);
    }
  });
  
  router.get('/:coinId', async (req, res, next) => {
    try {
      const coinId = req.params.coinId;
      const detailsResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  
      res.json(detailsResponse.data);
    } catch (error) {
      console.error('Error fetching coin details:', error);
      next(error);
    }
  });

  
router.get('/:coinId/price', async (req, res, next) => {
    try {
      const coinId = req.params.coinId;
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: 'usd',
        },
      });
      const currentPrice = response.data[coinId].usd;
      res.json({ price: currentPrice });
    } catch (error) {
      console.error('Error fetching current price:', error);
      next(error);
    }
  });
  
  module.exports = router;
  
// Handle requests without a coinId parameter (e.g., http://localhost:3001/crypto/)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Please provide a coinId parameter' });
  });

module.exports = router;