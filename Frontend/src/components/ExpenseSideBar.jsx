import React, { useState, useEffect } from 'react';
import styles from './ExpenseSideBar.module.css';
import { getPlaidTransactions } from '../utils/http';
import { useTranslation } from 'react-i18next';

const ExpenseSideBar = () => {
  const [expensesByCategory, setExpensesByCategory] = useState({});
  const [maxExpenseAmount, setMaxExpenseAmount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPlaidTransactions = async () => {
      try {
        const transactions = await getPlaidTransactions();
        console.log('Fetched transactions:', transactions);
        const expensesByCategory = sumExpensesByCategory(transactions);
        const maxExpenseAmount = getMaxExpenseAmount(expensesByCategory);
        setExpensesByCategory(expensesByCategory);
        setMaxExpenseAmount(maxExpenseAmount);
      } catch (error) {
        console.error('Error fetching Plaid transactions:', error);
      }
    };

    fetchPlaidTransactions();
  }, []);

  const sumExpensesByCategory = (data) => {
    const expensesByCategory = {};
  
    // Check if data.one_time_cost exists
    if (data && data.one_time_cost) {
      data.one_time_cost.forEach((transaction) => {
        const category = transaction.accountId.catagory[0]; // Correct the typo in 'catagory'
        const amount = Math.abs(transaction.accountId.amount);
        if (!expensesByCategory[category]) {
          expensesByCategory[category] = 0;
        }
        expensesByCategory[category] += amount;
      });
    } else {
      console.error('Invalid data structure: missing one_time_cost property');
    }
  
    return expensesByCategory;
  };

  const getMaxExpenseAmount = (expensesByCategory) => {
    return Math.max(...Object.values(expensesByCategory));
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Where your money went:</h2>
      <ul className={styles.expensesList}>
        {Object.entries(expensesByCategory).map(([category, amount]) => (
          <li key={category} className={styles.expenseItem}>
            <span className={styles.expenseCategory}>{t(`expenses.category.${category.toLowerCase().replace(/\s+/g, '')}`)}</span>
            <div className={styles.expenseBarContainer}>
              <div
                className={styles.expenseBar}
                style={{ width: `${(amount / maxExpenseAmount) * 100}%` }}
              ></div>
            </div>
            <span className={styles.expenseAmount}>${amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ExpenseSideBar;
