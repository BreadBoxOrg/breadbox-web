import React, { useState, useEffect } from "react";
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

const Finances = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('financeItems');
    return savedItems ? JSON.parse(savedItems) : ['totalInvestedNetEarned', 'assetDetails', 'portfolioDiversity', 'accountBalances', 'investmentGoals'];
  });
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('financeItems', JSON.stringify(items));
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

  const getWidgetClasses = (widgetId) => {
    switch (widgetId) {
      case 'totalInvestedNetEarned':
        return 'md:col-start-2 md:col-span-2';
      case 'assetDetails':
        return 'md:col-start-2 md:col-span-2 md:row-start-3';
      case 'portfolioDiversity':
        return 'md:col-start-4 md:col-span-2 md:row-start-2 md:row-span-2';
      case 'accountBalances':
        return 'md:col-start-4 md:col-span-2 md:row-start-4';
      case 'investmentGoals':
        return 'md:col-start-2 md:col-span-2 md:row-start-4';
      default:
        return '';
    }
  };

  const renderWidget = (widgetId) => {
    const widgetClasses = getWidgetClasses(widgetId);
    const overlayClasses = isEditMode ? 'relative before:absolute before:inset-0 before:bg-gray-500 before:opacity-50 before:rounded-lg' : '';

    switch (widgetId) {
      case 'totalInvestedNetEarned':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="totalInvestedNetEarned" id="totalInvestedNetEarned">
              <div className="flex flex-col md:flex-row justify-start gap-7">
                <TotalInvested />
                <NetEarned />
              </div>
            </SortableItem>
          </div>
        );
      case 'assetDetails':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="assetDetails" id="assetDetails">
              <AssetDetails />
            </SortableItem>
          </div>
        );
      case 'portfolioDiversity':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="portfolioDiversity" id="portfolioDiversity">
              <PortfolioDiversity />
            </SortableItem>
          </div>
        );
      case 'accountBalances':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="accountBalances" id="accountBalances">
              <AccountBalances />
            </SortableItem>
          </div>
        );
      case 'investmentGoals':
        return (
          <div className={`${widgetClasses} ${overlayClasses}`}>
            <SortableItem key="investmentGoals" id="investmentGoals">
              <InvestmentGoals />
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
      <div className="pt-[200px] md:pt-5 ml-1 md:ml-[2px] max-w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-9 md:gap-18 md:row-gap-5 p-2.5 mx-auto">
          <h1 className="col-start-1 md:col-start-2 md:col-span-4 font-bold text-[#1ADBA9] text-xl md:text-3xl">Finances</h1>
          <button
            className="hidden md:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Save' : 'Edit'}
          </button>
          {isEditMode ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map(renderWidget)}
              </SortableContext>
            </DndContext>
          ) : (
            <>
              {items.map(renderWidget)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Finances;
