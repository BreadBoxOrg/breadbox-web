/*
  * File: 
    *WidgetToolTip.jsx

  * Description: 
    *This file contains the code for the widget tooltip component for the first time user hints.
  * 
*/


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WidgetTooltip = ({ widget, isActive, widgetRef }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, opacity: 0 });
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (isActive && widgetRef.current) {
      const { top, left, width } = widgetRef.current.getBoundingClientRect();
      setTooltipPosition({ top: top + window.scrollY, left: left + width / 2, opacity: 1 });
    } else {
      setTooltipPosition((prevPosition) => ({ ...prevPosition, opacity: 0 }));
    }
  }, [isActive, widgetRef]);
// Tooltip text for each widget
const tooltipText = {
  dashboard: {
    moneyEarned: t('userHints.tooltipText.moneyEarned'),
    recentRecurring: t('userHints.tooltipText.recentRecurring'),
    networthSavingsGoal: t('userHints.tooltipText.networthSavingsGoal'),
    crypto: t('userHints.tooltipText.crypto'),
    cashFlow: t('userHints.tooltipText.cashFlow'),
  },
  expenses: {
    expensesList: t('userHints.tooltipText.expensesList'),
    expenseSideBar: t('userHints.tooltipText.expenseSideBar'),
  },
  finances: {
    totalInvestedNetEarned: t('userHints.tooltipText.totalInvestedNetEarned'),
    assetDetails: t('userHints.tooltipText.assetDetails'),
    portfolioDiversity: t('userHints.tooltipText.portfolioDiversity'),
    accountBalances: t('userHints.tooltipText.accountBalances'),
    investmentGoals: t('userHints.tooltipText.investmentGoals'),

    },
    settings: {
      linkComponent: t('userHints.tooltipText.linkComponent'),
    },
  };

  const getCurrentPage = () => {
    if (location.pathname === "/dashboard") return "dashboard";
    if (location.pathname === "/expenses") return "expenses";
    if (location.pathname === "/finances") return "finances";
    if (location.pathname === "/settings") return "settings";
    return "";
  };

  const currentPage = getCurrentPage();
// Tooltip component
  return (
    <div
    className="text-white absolute p-4 bg-white rounded-lg shadow-lg transition-all duration-500 transform -translate-x-1/2 bg-zinc-800" 
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        opacity: tooltipPosition.opacity,
      }}
    >
      <p className="text-lg font-semibold ">{widget.name}</p>
      <p className="mt-2">{tooltipText[currentPage]?.[widget.id] || ""}</p>
    </div>
  );
};

export default WidgetTooltip;