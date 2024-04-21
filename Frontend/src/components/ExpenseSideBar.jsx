/*
  * File: 
    *ExpensesSideBar.jsx

  * Description: 
    * Sidebar component that displays a list of expenses by category and a bar chart to visualize the amount spent in each category.
    * The data is fetched from the mock data file and the expenses are summed by category.
    * The maximum expense amount is calculated to set the width of the bars in the bar chart.
  * 
*/


import React from 'react';
import { ExpensesPeriodMockData } from '../components/mock_data/mockData';
import styles from './ExpenseSideBar.module.css'; 

//  sum expenses by category
const sumExpensesByCategory = (data) => {
  const expensesByCategory = {};

  data.forEach(period => {
    period.transactions.forEach(transaction => {
      const category = transaction.category;
      const amount = Math.abs(transaction.amount); 
      if (!expensesByCategory[category]) {
        expensesByCategory[category] = 0;
      }
      expensesByCategory[category] += amount;
    });
  });

  return expensesByCategory;
};

// get maximum expense amount for setting bar widths
const getMaxExpenseAmount = (expensesByCategory) => {
  return Math.max(...Object.values(expensesByCategory));
};

const ExpenseSideBar = () => {
  const expensesByCategory = sumExpensesByCategory(ExpensesPeriodMockData);
  const maxExpenseAmount = getMaxExpenseAmount(expensesByCategory);

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Where your money went:</h2>
      <ul className={styles.expensesList}>
        {Object.entries(expensesByCategory).map(([category, amount]) => (
          <li key={category} className={styles.expenseItem}>
            <span className={styles.expenseCategory}>{category}</span>
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
