/*
  * File: 
    *AssetDetails.jsx

  * Description: 
    * This file contains the code for the stocks widget shown in the finances page
    * It talks to the FinancialManagementGroup API to obtain stock information
    * It uses recharts for the visualization of the stock trends
    * Has a mini side bar on the left side for quick access to five given stocks
  * 
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, } from 'recharts';

function AssetDetails() {
  const [stockData, setStockData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [priceTrend, setPriceTrend] = useState('');
  const [savedStocks, setSavedStocks] = useState(['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB']);
  const [inputSymbol, setInputSymbol] = useState('');
  const [replaceMode, setReplaceMode] = useState(false);

  const fetchData = async (symbol) => {
    try {
      const historicalResponse = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`, {
        params: {
          serietype: 'line',
          timeseries: 30,
          apikey: process.env.REACT_APP_FMP_API,
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
    if (!replaceMode) {
      setStockSymbol(symbol);
    } else {
      let newSavedStocks = [...savedStocks];
      const index = savedStocks.indexOf(symbol);
      newSavedStocks[index] = stockSymbol; // Replace with the new stock symbol
      setSavedStocks(newSavedStocks);
      setReplaceMode(false); // Exit replace mode
    }
  };

  const handleSaveStock = () => {
    setReplaceMode(true); // Enter replace mode
  };

  const handleInputChange = (e) => {
    setInputSymbol(e.target.value.toUpperCase());
  };

  const handleSearch = () => {
    if (inputSymbol) {
      setStockSymbol(inputSymbol);
      setReplaceMode(false);  // Make sure replace mode is off when searching a new symbol
    }
  };

  const gradientId = `priceTrendGradient-${priceTrend}`;

  return (
    <div style={{ display: 'flex', backgroundColor: '#0a0a0a', padding: '0.5vw', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', position: 'relative', width: '100%', height:'100%'}}>
      <div style={{ marginRight: '2vw' }}>
        {savedStocks.map((symbol) => (
          <div key={symbol} onClick={() => handleStockSelection(symbol)} style={{ cursor: 'pointer', color: 'white', padding: '0.5vw', borderBottom: '1px solid grey', backgroundColor: replaceMode ? 'rgba(128, 128, 128, 0.2)' : 'transparent' }}>
            {symbol}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, height: '100%' }}>
        <div style={{ color: 'white', marginBottom: '20px' }}>
          <input type="text" placeholder="Enter stock symbol" value={inputSymbol} onChange={handleInputChange} style={{ marginRight: '10px', color: 'white', backgroundColor: 'transparent', border: '1px solid white' }} />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleSaveStock} style={{ marginLeft: '10px' }}>Save</button>
          <h2>{stockSymbol}</h2>
          <h3>${currentPrice ? currentPrice.toLocaleString() : 'Loading...'}</h3>
        </div>

            <ResponsiveContainer width="100%" height="70%">
            <AreaChart data={stockData} margin={{ top: 5, right: 0, left: 10, bottom: 0 }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={priceTrend === 'up' ? 'green' : 'red'} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={priceTrend === 'up' ? 'green' : 'red'} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="date" axisLine={false} tickLine={false} />
      <YAxis domain={['dataMin', 'dataMax']} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} />
      <Tooltip content={<CustomTooltip />} cursor={false} />
      <Area type="monotone" dataKey="price" stroke={priceTrend === 'up' ? 'green' : 'red'} fillOpacity={1} fill={`url(#${gradientId})`} strokeWidth={2} />
    </AreaChart>

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
