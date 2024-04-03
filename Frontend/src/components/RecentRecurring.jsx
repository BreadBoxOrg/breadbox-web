import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Transactions from './Transactions';
// import { RecentRecurringMockData as data } from './mock_data/mockData';
import { getPlaidTransactions } from '../utils/http';


function RecentRecurring() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [drawerOpen, setDrawerOpen] = useState(true); // fix it to use false, right now true = closed, false = open smh
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]); // THIS IS GOING TO HOLD THE TRANSACTION DATA

  useEffect(() => {
    async function fetchTransactions() {
      const promise = getPlaidTransactions();
      promise.then((transactions) => { 
        // create local transaction object list
        let transactionsDisplayList = [];
        console.log(transactions.recuring_cost);
        // loop through transactions.recuring_costs
        transactions.recuring_cost.forEach( item => {
          // create temp object add name and amount 
          const displayItem = {
            name: item.merchantName,
            value: item.amount
          };
          transactionsDisplayList.push(displayItem);
        });

        setTransactionData(transactionsDisplayList);
      }).catch((err) => { 
        console.log(err)});

    }
    fetchTransactions();
  }, []);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const generateColor = (index, isActive) => {
    const hue = (360 * index) / transactionData.length;
    const lightness = isActive ? 85 : 70;
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };

  return (
    <div style={{ position: 'relative', width: '100%', margin: 'auto' }}>
      <div style={{
        position: 'relative',
        margin: 'auto',
        backgroundColor: '#141516',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        color: 'white',
        paddingBottom: '60px',
        zIndex: 3
      }}>
        <div style={{
          borderBottom: '2px solid #1ADBA9',
          paddingBottom: '10px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px'}}>Recurring Costs</h2>
          <div style={{ position: 'relative' }}>
            <button onClick={toggleDropdown} style={{
              backgroundColor: '#2C2C2E', 
              color: 'white', 
              padding: '10px 20px', 
              border: '1px solid #1ADBA9',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              outline: 'none'
            }}>
              Monthly ▼
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                backgroundColor: '#2C2C2E',
                marginTop: '5px',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                zIndex: 3
              }}>
                <div style={{ padding: '10px', cursor: 'pointer' }}>Monthly</div>
                <div style={{ padding: '10px', cursor: 'pointer' }}>Quarterly</div>
                <div style={{ padding: '10px', cursor: 'pointer' }}>Yearly</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={transactionData}
                cx="30%"
                cy="50%"
                labelLine={false}
                outerRadius="70%"
                innerRadius="45%"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                paddingAngle={2}
                dataKey="value"
              >
                {transactionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={generateColor(index, index === activeIndex)}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ paddingLeft: '20px' }}
                formatter={(value, entry) => {
                  if (entry && entry.payload && entry.payload.value !== undefined) {
                    return <span>{entry.payload.name}: ${entry.payload.value.toLocaleString()}</span>;
                  }
                  return <span>Unknown</span>;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <button onClick={toggleDrawer} style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        borderRadius: '20px',
        backgroundColor: '#1ADBA9',
        color: 'black',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        zIndex: 4
      }}>
        {drawerOpen ? 'Show Recent Transactions' : 'Hide Recent Transactions'}
      </button>
    </div>
  );
}

const Drawer = ({ isOpen }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        backgroundColor: '#1e1e1e',
        color: 'white',
        transition: 'transform 0.3s ease',
        padding: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        zIndex: 2,
      }}
    >
      <Transactions />
    </div>
  );
};

export default RecentRecurring;
