import React, { useState, useEffect } from "react";
import WidgetTooltip from "../components/WidgetToolTip";
import { useNavigate, useLocation } from "react-router-dom";

const FirstTimeUserHints = ({ onClose, widgets, widgetRefs }) => {
  const [currentWidgetIndex, setCurrentWidgetIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isNewUser, setIsNewUser] = useState(() => {
    const hasSeenHints = localStorage.getItem('hasSeenHints');
    return hasSeenHints ? false : true;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isNewUser) {
      const timer = setInterval(() => {
        setCurrentWidgetIndex((prevIndex) => (prevIndex + 1) % widgets.length);
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isNewUser, widgets]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCurrentPage("dashboard");
    } else if (path === "/expenses") {
      setCurrentPage("expenses");
    } else if (path === "/finances") {
      setCurrentPage("finances");
    }
  }, [location]);

  const handleNextPage = () => {
    switch (currentPage) {
      case "dashboard":
        navigate("/expenses");
        break;
      case "expenses":
        navigate("/finances");
        break;
      case "finances":
        handleClose();
        break;
      default:
        handleClose();
        break;
    }
  };

  const handleBack = () => {
    switch (currentPage) {
      case "expenses":
        navigate("/dashboard");
        break;
      case "finances":
        navigate("/expenses");
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setIsNewUser(false);
    localStorage.setItem('hasSeenHints', 'true');
    onClose();
  };

  if (!isNewUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Welcome, New User!</h2>
          <button
            className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-1 px-2 rounded-xl text-sm"
            onClick={handleClose}
          >
            Got it!
          </button>
        </div>
        <p className="mb-2 text-sm">Here are some hints to get you started:</p>
        <ul className="list-disc list-inside text-sm">
          {currentPage === "dashboard" && (
            <>
              <li>Drag and drop widgets to rearrange them.</li>
              <li>Click "Edit" to enter edit mode.</li>
              <li>Explore each widget for financial insights.</li>
            </>
          )}
          {currentPage === "expenses" && (
            <>
              <li>View and manage your expenses in the list.</li>
              <li>Use the sidebar to filter [PENDING] and categorize expenses.</li>
            </>
          )}
          {currentPage === "finances" && (
            <>
              <li>Access your financial data and reports.</li>
              <li>Analyze your income, expenses, and savings.</li>
            </>
          )}
        </ul>
        <div className="flex justify-between mt-4">
          {currentPage !== "dashboard" && (
            <button
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded-xl text-sm"
              onClick={handleBack}
            >
              &larr; Back
            </button>
          )}
          {currentPage !== "finances" && (
            <button
              className="bg-green-400 hover:bg-green-700 text-black font-bold py-1 px-2 rounded-xl text-sm"
              onClick={handleNextPage}
            >
              Next &rarr;
            </button>
          )}
        </div>
      </div>
      {widgets.map((widget, index) => (
        <WidgetTooltip
          key={widget.id}
          widget={widget}
          isActive={index === currentWidgetIndex}
          widgetRef={widgetRefs[widget.id]}
        />
      ))}
    </div>
  );
};

export default FirstTimeUserHints;