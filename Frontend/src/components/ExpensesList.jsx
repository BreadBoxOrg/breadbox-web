import React, { useState } from 'react';
import { BarChart, Bar, Cell } from 'recharts';
import { ExpensesPeriodMockData } from '../components/mock_data/mockData';
import styles from './ExpensesList.module.css';

const ExpensesList = () => {
  const sortedData = [...ExpensesPeriodMockData].sort((a, b) => {
    const aPeriod = a.period.split('-');
    const bPeriod = b.period.split('-');
    const aStart = new Date(`2024-03-${aPeriod[0].padStart(2, '0')}`);
    const bStart = new Date(`2024-03-${bPeriod[0].padStart(2, '0')}`);
    return bStart.getTime() - aStart.getTime();
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(-1);

  const handleClick = (data, index) => {
    setActiveIndex(index);
  };

  const dataForChart = sortedData.map((period) => ({
    name: period.period,
    total: period.transactions.reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0)
  }));

  return (
    <div className={styles.container}>
      <BarChart
        width={600}
        height={150}
        data={dataForChart}
        margin={{
          top: 10, right: 10, left: 10, bottom: 10,
        }}
        barGap={2}
        barSize={50}
      >
        <Bar
          dataKey="total"
          fill="#1ADBA9"
          onClick={handleClick}
          onMouseOver={(data, index) => setHoveredBarIndex(index)}
          onMouseOut={() => setHoveredBarIndex(-1)}
        >
          {dataForChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === hoveredBarIndex ? '#76b2ff' : '#104fe1'} />
          ))}
        </Bar>
      </BarChart>

      {activeIndex !== null && (
        <div className={styles.transactionList} style={{ maxHeight: '600px', overflowY: 'auto', maxWidth: '100%' }}>
          <h3 className={styles.period}>{sortedData[activeIndex].period}</h3>
          {sortedData[activeIndex].transactions.map((transaction, idx) => (
            <div key={idx} className={styles.transaction}>
              <div className={styles.transactionIcon}>
                <span className={`${styles.icon} ${styles[transaction.category.toLowerCase()]}`}></span>
              </div>
              <div className={styles.transactionDetails}>
                <p className={styles.transactionCategory}>{transaction.category}</p>
                <div className={styles.transactionAmountAndTime}>
                  <span className={styles.transactionTime}>{transaction.time} - {transaction.place}</span>
                  <span className={styles.transactionAmount}>${Math.abs(transaction.amount)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpensesList;
