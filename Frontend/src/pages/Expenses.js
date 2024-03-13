import React from "react";
import styles from './Expenses.module.css';
import NavbarLayout from "../components/SideBar";
import ExpensesList from "../components/ExpensesList";
import ExpenseSideBar from "../components/ExpenseSideBar";

const Expenses = () => {
  return (
    <>
      <NavbarLayout></NavbarLayout>
      <body className={styles.expenses}>
        <div className={styles.parent}>
        <div className={styles.div2}> <h1>Expenses</h1> </div>
          <div className={styles.div3}> <ExpensesList/> </div>
          <div className={styles.div4}> <ExpenseSideBar/> </div>
        </div>
      </body>
    </>
  );
}

export default Expenses;