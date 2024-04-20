import React, { useRef, useState } from "react";
import NavbarLayout from "../components/SideBar";
import ExpensesList from "../components/ExpensesList";
import ExpenseSideBar from "../components/ExpenseSideBar";
import FirstTimeUserHints from './FirstTimeUserHints';

const Expenses = () => {
  const [isNewUser, setIsNewUser] = useState(true);

  const widgetRefs = {
    expensesList: useRef(null),
    expenseSideBar: useRef(null),
  };

  const widgets = [
    { id: "expensesList", name: "Expenses List" },
    { id: "expenseSideBar", name: "Expense Sidebar" },
  ];

  const handleCloseHints = () => {
    setIsNewUser(false);
  };

  return (
    <>
      <NavbarLayout></NavbarLayout>
      <div className="pt-44 md:pt-0 ml-0 md:ml-[20px] max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-2.5 p-2.5 mx-auto overflow-x-hidden">
          <h1 className="col-span-1 md:col-start-2 md:col-span-3 font-bold text-[#1ADBA9] text-xl md:text-3xl">
            Expenses
          </h1>
          <div
            ref={widgetRefs.expensesList}
            className="mr-[6vw] col-span-1 md:col-start-2 md:col-span-3 md:row-start-2 md:row-span-4"
          >
            <ExpensesList />
          </div>
          <div
            ref={widgetRefs.expenseSideBar}
            className="col-span-1 md:col-start-5 md:row-start-1 md:row-span-5"
          >
            <ExpenseSideBar />
          </div>
        </div>
      </div>
      <FirstTimeUserHints
        isNewUser={isNewUser}
        onClose={handleCloseHints}
        widgets={widgets}
        widgetRefs={widgetRefs}
      />
    </>
  );
};

export default Expenses;