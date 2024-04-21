// Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from '../components/SortableItem.js';
import NavbarLayout from '../components/SideBar.js';
import ChatBotAssistant from '../components/chatbot/ChatBot.jsx';
import MoneyEarned from '../components/MoneyEarned.jsx';
import RecentRecurring from '../components/RecentRecurring.jsx';
import Crypto from '../components/Crypto.jsx';
import Networth from '../components/Networth.jsx';
import SavingsGoal from '../components/SavingsGoal.jsx';
import CashFlow from '../components/Cashflow.jsx';
import { AccessTokenContext } from "../App";
import { useContext } from "react";
import { userInfo } from '../components/mock_data/mockData.js';
import { useTranslation } from 'react-i18next';
import FirstTimeUserHints from './FirstTimeUserHints';

function Dashboard() {

  const { t, i18n } = useTranslation();

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('dashboardItems');
    return savedItems ? JSON.parse(savedItems) : ['moneyEarned', 'recentRecurring', 'networthSavingsGoal', 'crypto', 'cashFlow'];
  });
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));
  const [isEditMode, setIsEditMode] = useState(false);
  const { accessToken } = useContext(AccessTokenContext);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true);

  const widgetRefs = {
    moneyEarned: useRef(null),
    recentRecurring: useRef(null),
    networthSavingsGoal: useRef(null),
    crypto: useRef(null),
    cashFlow: useRef(null),
  };

  const widgets = [
    { id: 'moneyEarned', name: t('dashboard.money-earned') },
    { id: 'recentRecurring', name: t('dashboard.recent-recurring') },
    { id: 'networthSavingsGoal', name: t('dashboard.networth_and_savings') },
    { id: 'crypto', name: t('dashboard.crypto') },
    { id: 'cashFlow', name: t('dashboard.cash-flow') },
  ];

  useEffect(() => {
    localStorage.setItem('dashboardItems', JSON.stringify(items));
    setLoading(false);
  }, [items, accessToken]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  let firstName = sessionStorage.getItem('firstName');
  if(!sessionStorage.getItem('firstName')){
    firstName = userInfo.find(item => item.firstName)?.firstName;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString(i18n.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getWidgetClasses = (widgetId) => {
    const index = items.indexOf(widgetId);
    switch (index) {
      case 0:
        return 'md:col-span-3';
      case 1:
        return 'md:col-span-2';
      case 2:
        return 'md:col-span-1 md:col-start-1';
      case 3:
        return 'md:col-span-2';
      case 4:
        return 'md:col-span-2 md:col-start-4';
      default:
        return '';
    }
  };

  const renderWidget = (widgetId) => {
    const widgetClasses = getWidgetClasses(widgetId);
    const overlayClasses = isEditMode ? 'relative before:absolute before:inset-0 before:bg-gray-500 before:opacity-50 before:rounded-2xl' : '';
    const glowClasses = isEditMode ? 'absolute inset-0 outline-none ring-4 ring-blue-400 ring-opacity-50 rounded-2xl animate-pulse-opacity' : '';
    const lightenClasses = isNewUser && widgets.find((widget) => widget.id === widgetId) ? 'relative before:absolute before:inset-0 before:bg-white before:opacity-50 before:rounded-2xl' : '';
    
    if (loading) {
      return (
        <div className={`${widgetClasses} animate-pulse`}>
          <div role="status" className="max-w-lg p-4 border border-gray-200 rounded shadow md:p-8 dark:border-gray-700">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-128 mb-2.5 "></div>
            <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex flex-wrap items-baseline mt-4 gap-2">
              <div className="w-full bg-gray-200 rounded-t-lg h-20 dark:bg-gray-700"></div>
              <div className="w-full bg-gray-200 rounded-t-lg h-16 dark:bg-gray-700"></div>
              <div className="w-full bg-gray-200 rounded-t-lg h-12 dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    switch (widgetId) {
      case 'moneyEarned':
        return (
          <div ref={widgetRefs.moneyEarned} className={`${widgetClasses} ${overlayClasses}`}>
            {isEditMode && <div className={glowClasses}></div>}
            <SortableItem key="moneyEarned" id="moneyEarned">
              <MoneyEarned />
            </SortableItem>
          </div>
        );
      case 'recentRecurring':
        return (
          <div ref={widgetRefs.recentRecurring} className={`${widgetClasses} ${overlayClasses}`}>
            {isEditMode && <div className={glowClasses}></div>}
            <SortableItem key="recentRecurring" id="recentRecurring">
              <RecentRecurring />
            </SortableItem>
          </div>
        );
      case 'networthSavingsGoal':
        return (
          <div ref={widgetRefs.networthSavingsGoal} className={`${widgetClasses} ${overlayClasses}`}>
            {isEditMode && <div className={glowClasses}></div>}
            <SortableItem key="networthSavingsGoal" id="networthSavingsGoal">
              <div className="flex flex-col gap-[20px] md:gap-[40px]">
                <Networth />
                <SavingsGoal />
              </div>
            </SortableItem>
          </div>
        );
      case 'crypto':
        return (
          <div ref={widgetRefs.crypto} className={`${widgetClasses} ${overlayClasses}`}>
            {isEditMode && <div className={glowClasses}></div>}
            <SortableItem key="crypto" id="crypto">
              <Crypto />
            </SortableItem>
          </div>
        );
      case 'cashFlow':
        return (
          <div ref={widgetRefs.cashFlow} className={`${widgetClasses} ${overlayClasses}`}>
            {isEditMode && <div className={glowClasses}></div>}
            <SortableItem key="cashFlow" id="cashFlow">
              <CashFlow />
            </SortableItem>
          </div>
        );
      default:
        return null;
    }
  };


  const handleCloseHints = () => {
    setIsNewUser(false);
  };

  return (
    <>
      <NavbarLayout />
      <div className="ml-0 pt-[200px] md:ml-[275px] md:pt-0">
        <div className="flex flex-col gap-[30px] mx-[10px] md:mx-0 md:ml-[0.5vw] max-w-full md:max-w-[82vw] pb-[20px]">
          <div className="font-bold text-[#1ADBA9] mt-5 text-3xl">{t('dashboard.welcome')}, {firstName}</div>
          <p className="text-[#8f8f8f]">{formattedDate}</p>
          <div className="flex justify-end">
            <button
              className="hidden md:block bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-xl"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? `${t('dashboard.save-button')}` : `${t('dashboard.edit-button')}`}
            </button>
          </div>
          
          {isEditMode ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px] md:gap-[40px]">
                  {items.map(renderWidget)}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px] md:gap-[40px]">
              {items.map(renderWidget)}
            </div>
          )}
          <div className="fixed bottom-[20px] right-[20px] z-50"><ChatBotAssistant /></div>
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
}

export default Dashboard;