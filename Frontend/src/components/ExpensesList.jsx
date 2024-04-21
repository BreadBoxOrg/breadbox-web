/*
  * File: 
    *ExpensesList.jsx

  * Description: 
    * This component displays a bar chart of the user's expenses over time.
    * The user can click on a bar to view the transactions for that period.
    * The user can also navigate between periods using the arrow buttons or clicking on the bar itself.
  * 
*/

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, ReferenceLine} from 'recharts';
import { getPlaidTransactions } from '../utils/http';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './ExpensesList.module.css';
import { AccountBalance, AttachMoney, People, Fastfood, 
        MedicalInformation, Paid, HomeRepairService, Store, Map, Terrain} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ExpensesList = () => {

  const [transactionsData, setTransactionsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(-1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetchedTransactions = await getPlaidTransactions();
        processFetchedTransactions(fetchedTransactions);
        setActiveIndex(0); 
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const processFetchedTransactions = (fetchedTransactions) => {
    let processedData = {};

    fetchedTransactions.one_time_cost.forEach((transaction) => {
      const { date, amount } = transaction.accountId;
      const [year, month] = date.split('-').slice(0, 2);
      const periodKey = `${year}-${month}`;

      if (!processedData[periodKey]) {
        processedData[periodKey] = {
          period: periodKey,
          transactions: []
        };
      }

      function formatDate(dateString) {
        const dateObject = new Date(dateString);
        const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate() + 1}/${dateObject.getFullYear()}`;
        return formattedDate;
      }
// Icons for each category
      const PlaidCategoryIcons = {
        'Bank Fees': <AccountBalance />,
        'Community': <People />,
        'Food and Drink': <Fastfood />,
        'Healthcare': <MedicalInformation />,
        'Payment': <Paid />,
        'Recreation': <Terrain />,
        'Service': <HomeRepairService />,
        'Shops': <Store />,
        'Travel': <Map />
      };

      processedData[periodKey].transactions.push({
        category: transaction.accountId.catagory[0],
        amount,
        time: transaction.accountId.date ? formatDate(transaction.accountId.date) : 'Unknown',
        place: transaction.accountId.merchantName || 'Unknown',
        icon: PlaidCategoryIcons[transaction.accountId.catagory[0]] || <AttachMoney />
      });
    });

    const processedArray = Object.values(processedData).sort((a, b) => a.period.localeCompare(b.period));
    setTransactionsData(processedArray);
  };
// Functions to navigate to the next/prev bar
  const nextBar = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % transactionsData.length);
  };

  const prevBar = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + transactionsData.length) % transactionsData.length);
  };

  const dataForChart = transactionsData.map((period, index) => ({
    name: period.period,
    total: period.transactions.reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0),
    index 
  }));

  // Bar chart with the transaction
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <BarChart
        width={600}
        height={200}
        data={dataForChart}
        margin={{
          top: 10, right: 30, left: 30, bottom: 10,
        }}
        barGap={2}
        barSize={50}
      >
        <ReferenceLine y={0} stroke="white" />
        <Bar
          dataKey="total"
          fill="#1ADBA9"
          onClick={(data) => setActiveIndex(data.index)}
          onMouseOver={(data, index) => setHoveredBarIndex(index)}
          onMouseOut={() => setHoveredBarIndex(-1)}
          radius={[15, 15, 0, 0]}
        >
          {dataForChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === activeIndex ? '#76b2ff' : index === hoveredBarIndex ? '#76b2ff' : '#104fe1'} />
          ))}
        </Bar>
      </BarChart>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        <IconButton onClick={prevBar} aria-label="previous" sx={{ color: 'white' }}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={nextBar} aria-label="next" sx={{ color: 'white' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      {activeIndex >= 0 && activeIndex < transactionsData.length && (
        <div className={styles.transactionList} style={{ maxHeight: '600px', overflowY: 'auto', maxWidth: '100%' }}>
          <h3 className={styles.period}>{transactionsData[activeIndex].period}</h3>
          {transactionsData[activeIndex].transactions.map((transaction, idx) => (
            <div key={idx} className={styles.transaction}>
              <div className={`${styles.transactionIcon} ${styles[transaction.category.toLowerCase().replace(/\s/g, '')]}`}>
                <span className={styles.icon}>{transaction.icon}</span>
              </div>
              <div className={styles.transactionDetails}>
                <p className={styles.transactionCategory}>{t(`expenses.category.${transaction.category.toLowerCase().replace(/\s/g, '')}`)}</p>
                <div className={styles.transactionAmountAndTime}>
                  <span className={styles.transactionTime}>{transaction.time} - {transaction.place}</span>
                  <span className={styles.transactionAmount}>${Math.abs(transaction.amount).toFixed(2)}</span>
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
