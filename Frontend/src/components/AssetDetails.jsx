import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

function AssetDetails() {
  const [stockData, setStockData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [stockSymbol, setStockSymbol] = useState('AAPL'); // hardcoded 
  const [priceTrend, setPriceTrend] = useState('');

  const stockOptions = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB']; //hardcoded  (all of these stock options would be made by calling our own API to give me the required data)

  const fetchData = async (symbol) => {
    try {
      const historicalResponse = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`, {
        params: {
          serietype: 'line',
          timeseries: 30, 
          apikey: '', //env
        },
      });

      const historicalData = historicalResponse.data.historical.map(day => ({
        date: day.date,
        price: day.close,
      }));

      setStockData(historicalData);

      if (historicalData.length > 1) {
        const trend = historicalData[historicalData.length - 1].price > historicalData[0].price ? 'up' : 'down';
        setPriceTrend(trend);
      }

      setCurrentPrice(historicalData[historicalData.length - 1].price);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData(stockSymbol);
  }, [stockSymbol]);

  const handleStockSelection = (symbol) => {
    setStockSymbol(symbol);
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#0a0a0a', padding: '10px', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', position: 'relative' }}>
      <div style={{ marginRight: '20px' }}>
        {stockOptions.map((symbol) => (
          <div key={symbol} onClick={() => handleStockSelection(symbol)} style={{ cursor: 'pointer', color: 'white', padding: '10px', borderBottom: '1px solid grey' }}>
            {symbol}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, height: '350px' }}>
        <div style={{ color: 'white'}}>
          <h2>{stockSymbol}</h2>
          <h3>${currentPrice ? currentPrice.toLocaleString() : 'Loading...'}</h3>
        </div>

        <ResponsiveContainer width="100%" height="70%">
          <LineChart data={stockData} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis domain={['dataMin', 'dataMax']} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line type="monotone" dataKey="price" stroke={priceTrend === 'up' ? 'green' : 'red'} dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px' }}>
        <p className="label" style={{ margin: '0' }}>{`Date: ${label}`}</p>
        <p className="label" style={{ margin: '0' }}>{`Price: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

export default AssetDetails;
