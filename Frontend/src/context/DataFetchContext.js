/*
  * File: 
    *DataFetchContext.js

  * Description: 
    * This file is responsible for fetching data from the backend and storing it in the context.
    * This file fetches all transaction data, dropdown data, income data, account data, and total investment amount.
    * The data is then set in the context to be used by other components.
*/
import React, { createContext, useState, useEffect } from 'react';
import { getPlaidTransactions, getPlaidMonthlyIncome, getPlaidRecurringIncome, getPlaidNetIncome, getPlaidAccounts } from '../utils/http'; // Import your fetch functions
import { useTranslation } from 'react-i18next';


export const DataFetchContext = createContext();

export const DataFetchProvider = ({ children }) => {
  const { t } = useTranslation();
  const [transactionData, setTransactionData] = useState([]);
  const [dropdownData, setDropdowndata] = useState([]); // [ {id: 1, title: "title", date: "date", amount: "amount"}, ...
  const [incomeData, setIncomeData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const transactions = await getPlaidTransactions();
      const income = await getPlaidMonthlyIncome("2024-01-20");
      const account = await getPlaidAccounts();

      /**************************************************************************** */
        // transactions data
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
        // dropdown data
      /**************************************************************************** */

      // dropdown information
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
        // finances data
      /**************************************************************************** */
        let  financesDisplayList = [];
        if (account) {
          if (account && account.accounts) {
            const filteredAccounts = account.accounts.filter(account => account.type !== 'loan' && account.subtype !== 'credit card');
            const formattedAccounts = filteredAccounts.map(account => ({
              name: `${account.name} (${account.mask})`,
              balance: `$${account.balances.current.toLocaleString()}`,
            }));
            console.log("ACCOUNT DATA:" + formattedAccounts);
            setAccountData(formattedAccounts);
          }
        }

        const investmentAccounts = account.accounts.filter(account => account.type === 'investment');
        let totalFinanceAmount = investmentAccounts.reduce((total, account) => total + account.balances.current, 0);

        setTotalInvestmentAmount(totalFinanceAmount);

      /**************************************************************************** */
        // income data
      /**************************************************************************** */
      let incomeDisplayList = [];
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

  // return the context provider and data
  return (
    <DataFetchContext.Provider
      value={{
        transactionData,
        dropdownData,
        incomeData,
        accountData,
        totalInvestmentAmount,
        // recurringExpensesData,
        // netIncomeData,
      }}
    >
      {children}
    </DataFetchContext.Provider>
  );
};