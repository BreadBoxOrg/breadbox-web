// DataFetchContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getPlaidTransactions, getPlaidMonthlyIncome, getPlaidRecurringIncome, getPlaidNetIncome } from '../utils/http'; // Import your fetch functions
import { useTranslation } from 'react-i18next';

export const DataFetchContext = createContext();

export const DataFetchProvider = ({ children }) => {
  const { t } = useTranslation();
  const [transactionData, setTransactionData] = useState([]);
  const [dropdownData, setDropdowndata] = useState([]); // [ {id: 1, title: "title", date: "date", amount: "amount"}, ...
  const [incomeData, setIncomeData] = useState([]);
//   const [incomeData, setIncomeData] = useState([]);
//   const [recurringExpensesData, setRecurringExpensesData] = useState([]);
//   const [netIncomeData, setNetIncomeData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const transactions = await getPlaidTransactions();
      const income = await getPlaidMonthlyIncome("2024-01-20");

    //   const recurringIncome = await getPlaidRecurringIncome();
    //   const netIncome = await getPlaidNetIncome();
      /**************************************************************************** */
        //transactions data
      /**************************************************************************** */
      let transactionsDisplayList = [];
      if (transactions.recuring_cost) {
        transactions.recuring_cost.forEach((item) => {
          const displayItem = {
            name: item.merchantName,
            value: item.amount,
          };
          transactionsDisplayList.push(displayItem);
        });
      }
      setTransactionData(transactionsDisplayList);

      /**************************************************************************** */
        //dropdown data
      /**************************************************************************** */

      //dropdown information
      let dropDownDisplayList = [];
      let i = 1;
      if (transactions.one_time_cost) {
        transactions.one_time_cost.forEach( item => {
          console.log(item);
          const displayItem = {
            id: i,
            title: item.accountId.merchantName,
            date: item.accountId.date,
            amount: item.accountId.amount
          };
          i++;
          dropDownDisplayList.push(displayItem);
        });
      }
      setDropdowndata(dropDownDisplayList);

      /**************************************************************************** */
        //income data
      /**************************************************************************** */


      // Process income data
      // let incomeDisplayList = [];
      // income.forEach((item) => {
      //   const displayItem = {
      //     name: item.source,
      //     value: item.amount,
      //   };
      //   incomeDisplayList.push(displayItem);
      // });
      // setIncomeData(incomeDisplayList);

      // // Process recurring expenses data
      // let recurringExpensesDisplayList = [];
      // recurringIncome.forEach((item) => {
      //   const displayItem = {
      //     name: item.merchantName,
      //     value: item.amount,
      //   };
      //   recurringExpensesDisplayList.push(displayItem);
      // });
      // setRecurringExpensesData(recurringExpensesDisplayList);

      // // Process net income data
      // let netIncomeDisplayList = [];
      // netIncome.forEach((item) => {
      //   const displayItem = {
      //     name: item.source,
      //     value: item.amount,
      //   };
      //   netIncomeDisplayList.push(displayItem);
      // });
      // setNetIncomeData(netIncomeDisplayList);
      let incomeDisplayList = [];
          // console.log("DEBUG_INCOME: " + income.monthly_break_down);
          // console.log("DEBUG_INCOME: " + income.yearly_total);
          // console.log("DEBUG_INCOME: " + income.error);
          // loop through transactions.recuring_costs
          const monthNames = [
            t('dashboard.months.January'), t('dashboard.months.February'), t('dashboard.months.March'),
            t('dashboard.months.April'), t('dashboard.months.May'), t('dashboard.months.June'),
            t('dashboard.months.July'), t('dashboard.months.August'), t('dashboard.months.September'),
            t('dashboard.months.October'), t('dashboard.months.November'), t('dashboard.months.December')
          ];
          
          for(let i = 0; i < 6; i++) {
            if (income.monthly_break_down) { // Check if income.monthly_break_down is not undefined
              let item = income.monthly_break_down[i];
              if (item) { // Check if item is not undefined or null
                console.log(item);
                let displayMonth = monthNames[item.month-1];
                let integerAmount =  Math.floor(item.income);          
                console.log(integerAmount);
                const displayItem = {
                  name: displayMonth,
                  amt: integerAmount    
                };
          
                incomeDisplayList.push(displayItem);
              }
            }
          }
          setIncomeData(incomeDisplayList);
    }

    fetchData();
  }, [t]);

  return (
    <DataFetchContext.Provider
      value={{
        transactionData,
        dropdownData,
        incomeData,
        // recurringExpensesData,
        // netIncomeData,
      }}
    >
      {children}
    </DataFetchContext.Provider>
  );
};