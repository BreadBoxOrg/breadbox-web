import React, { useState, useEffect } from 'react';
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

function Dashboard() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('dashboardItems');
    return savedItems ? JSON.parse(savedItems) : ['moneyEarned', 'recentRecurring', 'networthSavingsGoal', 'crypto', 'cashFlow'];
  });
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('dashboardItems', JSON.stringify(items));
  }, [items]);

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

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
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
    const overlayClasses = isEditMode ? 'relative before:absolute before:inset-0 before:bg-gray-500 before:opacity-50 before:rounded-lg' : '';
  
    switch (widgetId) {
      case 'moneyEarned':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="moneyEarned" id="moneyEarned">
              <MoneyEarned />
            </SortableItem>
          </div>
        );
      case 'recentRecurring':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="recentRecurring" id="recentRecurring">
              <RecentRecurring />
            </SortableItem>
          </div>
        );
      case 'networthSavingsGoal':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
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
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="crypto" id="crypto">
              <Crypto />
            </SortableItem>
          </div>
        );
      case 'cashFlow':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="cashFlow" id="cashFlow">
              <CashFlow />
            </SortableItem>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <NavbarLayout />
      <div className="ml-0 pt-[200px] md:ml-[275px] md:pt-0">
        <div className="flex flex-col gap-[30px] mx-[10px] md:mx-0 md:ml-[0.5vw] overflow-x-auto max-w-full md:max-w-[82vw] pb-[20px]">
          <div className="font-bold text-[#1ADBA9] mt-5 text-3xl">Welcome, BreadboxTest</div>
          <p className="text-[#8f8f8f]">{formattedDate}</p>
          <div className="flex justify-end">
          <button
  className="hidden md:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  onClick={() => setIsEditMode(!isEditMode)}
>
  {isEditMode ? 'Save' : 'Edit'}
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
    </>
  );
}

export default Dashboard;