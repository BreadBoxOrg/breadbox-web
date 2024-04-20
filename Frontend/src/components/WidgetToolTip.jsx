import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const WidgetTooltip = ({ widget, isActive, widgetRef }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, opacity: 0 });
  const location = useLocation();

  useEffect(() => {
    if (isActive && widgetRef.current) {
      const { top, left, width } = widgetRef.current.getBoundingClientRect();
      setTooltipPosition({ top: top + window.scrollY, left: left + width / 2, opacity: 1 });
    } else {
      setTooltipPosition((prevPosition) => ({ ...prevPosition, opacity: 0 }));
    }
  }, [isActive, widgetRef]);

  const tooltipText = {
    dashboard: {
      moneyEarned: "This widget displays your total money earned.",
      recentRecurring: "Here you can see your recent recurring transactions.",
      networthSavingsGoal: "This widget shows your net worth and savings goal progress.",
      crypto: "Keep track of your cryptocurrency investments here.",
      cashFlow: "Visualize your cash flow with this widget.",
    },
    expenses: {
      expensesList: "Manage and view your expenses in this list.",
      expenseSideBar: "Use the sidebar to filter and categorize your expenses.",
    },
    finances: {
      totalInvestedNetEarned: "See your total invested amount and net earnings.",
      assetDetails: "Get detailed information about your assets.",
      portfolioDiversity: "Analyze the diversity of your investment portfolio.",
      accountBalances: "Check your account balances here.",
      investmentGoals: "Set and track your investment goals with this widget.",
    },
  };

  const getCurrentPage = () => {
    if (location.pathname === "/dashboard") return "dashboard";
    if (location.pathname === "/expenses") return "expenses";
    if (location.pathname === "/finances") return "finances";
    return "";
  };

  const currentPage = getCurrentPage();

  return (
    <div
      className="absolute p-4 bg-white rounded-lg shadow-lg transition-all duration-500 transform -translate-x-1/2"
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        opacity: tooltipPosition.opacity,
      }}
    >
      <p className="text-lg font-semibold">{widget.name}</p>
      <p className="mt-2">{tooltipText[currentPage]?.[widget.id] || ""}</p>
    </div>
  );
};

export default WidgetTooltip;