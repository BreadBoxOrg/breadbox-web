import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

function Crypto() {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [coinName, setCoinName] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [priceTrend, setPriceTrend] = useState('');

  const fetchData = async () => { // fetchdata redone
    try {
      const [historicalResponse, detailsResponse] = await Promise.all([
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
          params: {
            vs_currency: 'usd',
            days: '30',
            interval: 'daily',
          },
        }),
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin')
      ]);

      const historicalData = historicalResponse.data.prices;
      setCryptoData(historicalData);
      setCoinName(detailsResponse.data.name);
      setCoinSymbol(detailsResponse.data.symbol.toUpperCase());

      if (historicalData.length > 1) { // price trend using historical data
        const trend = historicalData[historicalData.length - 1][1] > historicalData[0][1] ? 'up' : 'down';
        setPriceTrend(trend);
      }

      const currentPriceResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd',
        },
      });
      setCurrentPrice(currentPriceResponse.data.bitcoin.usd);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      width: '400px',
    }}>
      <div style={{
        paddingBottom: '10px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'white' }}>
          {`${coinName} (${coinSymbol}) `}
          <span style={{ color: priceTrend === 'up' ? 'green' : 'red' }}>
            {priceTrend === 'up' ? '▲' : '▼'}
          </span>
        </span>
        {currentPrice && (
          <span style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '5px', color: 'white' }}> ${currentPrice.toLocaleString()}
          </span>
        )}
      </div>

      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart data={cryptoData.map(item => ({ date: new Date(item[0]).toLocaleDateString(), price: item[1] }))} margin={{
            top: 5,
            right: 0,
            left: -100,
          }}>
          <XAxis axisLine={false} dataKey="date" tick={false} />
          <YAxis axisLine={false} domain={['dataMin', 'dataMax']} tick={false} tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip content={<CustomTooltip />} cursor={false}/>
          <Line type="monotone" dataKey="price" stroke={priceTrend === 'up' ? 'green' : 'red'} dot={false} strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// todo: give user option to search for their own crypto of choice
export default Crypto;