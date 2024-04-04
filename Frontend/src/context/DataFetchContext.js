// DataFetchContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getPlaidTransactions, getPlaidMonthlyIncome, getPlaidRecurringIncome, getPlaidNetIncome } from '../utils/http'; // Import your fetch functions

export const DataFetchContext = createContext();

export const DataFetchProvider = ({ children }) => {
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
      // Process transactions data
      let transactionsDisplayList = [];
      transactions.recuring_cost.forEach((item) => {
        const displayItem = {
          name: item.merchantName,
          value: item.amount,
        };
        transactionsDisplayList.push(displayItem);
      });
      setTransactionData(transactionsDisplayList);

      /**************************************************************************** */
        //dropdown data
      /**************************************************************************** */

      //dropdown information
      let dropDownDisplayList = [];
      let i = 1;
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
            "January", "February", "March", 
            "April", "May", "June", 
            "July", "August", "September", 
            "October", "November", "December"
          ];
          
          for(let i = 0; i < 6; i++) {
            // create temp object add name and amount 
            let item = income.monthly_break_down[i];
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
        
          setIncomeData(incomeDisplayList);
    }

    fetchData();
  }, []);

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