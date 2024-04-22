/*
 * File:
   *Crypto.jsx

 * Description:
   *This file defines the Crypto component which displays the historical price trend of a cryptocurrency over the past 30 days and its current price.
   *The component fetches the data from the CoinGecko API and displays the data using a recharts AreaChart.
   * Recharts is used to create the chart and display price trend of the cryptocurrency.
   * It includes a search form to allow the user to search for a specific cryptocurrency by entering the coin ID and pressing Enter or clicking the "Search" button.
 *
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
const backendURL = process.env.REACT_APP_BACKEND_URL;

function Crypto() {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [coinName, setCoinName] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [priceTrend, setPriceTrend] = useState('');
  const [inputValue, setInputValue] = useState('');

  const fetchData = async (coinId) => {
    try {
      const [historicalResponse, detailsResponse, currentPriceResponse] = await Promise.all([
        axios.get(`${backendURL}/crypto/${coinId}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '30',
            interval: 'daily',
          },
        }),
        axios.get(`${backendURL}/crypto/${coinId}`),
        axios.get(`${backendURL}/crypto/${coinId}/price`),
      ]);

      const historicalData = historicalResponse.data.prices;
      setCryptoData(historicalData);
      setCoinName(detailsResponse.data.name);
      setCoinSymbol(detailsResponse.data.symbol.toUpperCase());

      if (historicalData.length > 1) {
        const trend = historicalData[historicalData.length - 1][1] > historicalData[0][1] ? 'up' : 'down';
        setPriceTrend(trend);
      }

      setCurrentPrice(currentPriceResponse.data.price);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(inputValue);
  };

  useEffect(() => {
    fetchData('bitcoin');
  }, []);

  // CustomTooltip component to display the date and price of the cryptocurrency
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px' }}>
          <p className="label" style={{ margin: '0' }}>{`Date: ${label}`}</p>
          <p className="label" style={{ margin: '0' }}>{`Price: ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }

    return null;
  };

  const gradientId = `priceTrendGradient-${priceTrend}`;

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      width: '100%',
      height: '350px'
    }}>
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'white' }}>
            {`${coinName} (${coinSymbol}) `}
            <span style={{ color: priceTrend === 'up' ? 'green' : 'red' }}>
              {priceTrend === 'up' ? '▲' : '▼'}
            </span>
          </span>
          {currentPrice && (
            <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'white' }}>
              ${currentPrice.toLocaleString()}
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter coin ID (e.g., bitcoin, ethereum, litecoin)"
            style={{
              backgroundColor: '#0a0a0a',
              color: 'white',
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid white',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          />
          <button type="submit" style={{ padding: '8px 16px', fontSize: '16px' }}>
            Search
          </button>
        </form>
      </div>

      <ResponsiveContainer width={"100%"} height={250}>
        <AreaChart data={cryptoData.map(item => ({ date: new Date(item[0]).toLocaleDateString(), price: item[1] }))} margin={{
          top: 5,
          right: 0,
          left: -100,
        }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={priceTrend === 'up' ? 'green' : 'red'} stopOpacity={0.8} />
              <stop offset="79%" stopColor={priceTrend === 'up' ? 'green' : 'red'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis axisLine={false} dataKey="date" tick={false} />
          <YAxis axisLine={false} domain={['dataMin', 'dataMax']} tick={false} tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area type="monotone" dataKey="price" stroke={priceTrend === 'up' ? 'green' : 'red'} fillOpacity={1} fill={`url(#${gradientId})`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Crypto;