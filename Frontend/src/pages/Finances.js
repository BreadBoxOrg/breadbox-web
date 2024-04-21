/*
  * File: 
    *Finances.js

  * Description: 
    * This file creates the Finances page of the application.
    * The Finances page is a dashboard that displays the user's financial information.
    * The user can edit the layout of the dashboard by dragging and dropping the widgets.
    * The user can also edit the content of the widgets by clicking the edit button.
    * The user can view the total invested and net earned, asset details, portfolio diversity, account balances, and investment goals.
    * The user can also view hints for first time users.
  * 
*/

import React, { useState, useEffect, useRef } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from '../components/SortableItem.js';
import NavbarLayout from "../components/SideBar";
import NetEarned from "../components/NetEarned";
import TotalInvested from "../components/TotalInvested";
import AssetDetails from "../components/AssetDetails";
import AccountBalances from "../components/AccountBalances";
import PortfolioDiversity from "../components/PortfolioDiversity";
import InvestmentGoals from "../components/InvestmentGoals";
import FirstTimeUserHints from './FirstTimeUserHints';

const Finances = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('financeItems');
    return savedItems ? JSON.parse(savedItems) : ['totalInvestedNetEarned', 'assetDetails', 'portfolioDiversity', 'accountBalances', 'investmentGoals'];
  });
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  const widgetRefs = {
    totalInvestedNetEarned: useRef(null),
    assetDetails: useRef(null),
    portfolioDiversity: useRef(null),
    accountBalances: useRef(null),
    investmentGoals: useRef(null),
  };

  const widgets = [
    { id: "totalInvestedNetEarned", name: "Total Invested & Net Earned" },
    { id: "assetDetails", name: "Asset Details" },
    { id: "portfolioDiversity", name: "Portfolio Diversity" },
    { id: "accountBalances", name: "Account Balances" },
    { id: "investmentGoals", name: "Investment Goals" },
  ];

  useEffect(() => {
    localStorage.setItem('financeItems', JSON.stringify(items));
  }, [items]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id);
        const newIndex = prevItems.indexOf(over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const getWidgetClasses = (widgetId) => {
    const index = items.indexOf(widgetId);
    switch (index) {
      case 0:
        return 'md:col-start-2 md:col-span-2 md:row-start-1';
      case 1:
        return 'md:col-start-2 md:col-span-2 md:row-start-2';
      case 2:
        return 'md:col-start-4 md:col-span-2 md:row-start-1 md:row-span-2';
      case 3:
        return 'md:col-start-4 md:col-span-2 md:row-start-4';
      case 4:
        return 'md:col-start-2 md:col-span-2 md:row-start-4';
      default:
        return '';
    }
  };

  const renderWidget = (widgetId) => {
    const widgetClasses = getWidgetClasses(widgetId);
    const overlayClasses = isEditMode ? 'relative before:absolute before:inset-0 before:bg-gray-500 before:opacity-50 before:rounded-2xl' : '';
    const glowClasses = isEditMode ? 'absolute inset-0 outline-none ring-4 ring-blue-400 ring-opacity-50 rounded-2xl animate-pulse-opacity' : '';

  
    if (widgetId === 'totalInvestedNetEarned') {
      return (
        <div ref={widgetRefs.totalInvestedNetEarned} key={widgetId} className={`${widgetClasses}  flex justify-center w-full h-full`}>
          <div className="w-full h-full">
            <div className="flex flex-col md:flex-row justify-start gap-7 w-full h-full">
              <TotalInvested />
              <NetEarned />
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div ref={widgetRefs[widgetId]} key={widgetId} className={`${widgetClasses} ${overlayClasses}  flex justify-center w-full h-full`}>
        {isEditMode && <div className={glowClasses}></div>}
        <SortableItem id={widgetId} className="w-full h-full" disabled={!isEditMode}>
          {widgetId === 'assetDetails' && <AssetDetails />}
          {widgetId === 'portfolioDiversity' && <PortfolioDiversity />}
          {widgetId === 'accountBalances' && <AccountBalances />}
          {widgetId === 'investmentGoals' && <InvestmentGoals />}
        </SortableItem>
      </div>
    );
  };
  

  const handleCloseHints = () => {
    setIsNewUser(false);
  };

  return (
    <>
      <NavbarLayout />
      <div className="pt-[200px] md:pt-5 ml-1 md:ml-[2px] max-w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-9 md:gap-18 md:row-gap-5 p-2.5 mx-auto">
          <div className="col-start-1 md:col-start-2 md:col-span-5 flex justify-between items-center">
            <h1 className="font-bold text-[#1ADBA9] text-xl md:text-3xl">Finances</h1>
            <button
              className="hidden md:inline-block bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-xl"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? 'Save' : 'Edit'}
            </button>
          </div>
          {isEditMode ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-9 md:gap-18 md:row-gap-5 w-full h-full">
                  {items.map(renderWidget)}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-9 md:gap-18 md:row-gap-5 w-full h-full">
              {items.map(renderWidget)}
            </div>
          )}
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

export default Finances;