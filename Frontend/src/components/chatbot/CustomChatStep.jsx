/*
  * File: 
    * CustomChatStep.jsx

  * Description: 
    * This file contains the custom chat step component for the chatbot.
    * It uses the ChatStep component from the react-simple-chatbot library.
    * The CustomChatStep component is used to generate responses for the chatbot.
    * This is also used to send financial data to the chatbot.
*/
import React, { useState, useEffect } from 'react';
import { sendMessage } from './sendchat';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import { RecentRecurringMockData, MoneyEarnedMockData, MockSavingsGoalData, ExpensesPeriodMockData } from '../mock_data/mockData.js';

const financialData = {
    RecentRecurring: RecentRecurringMockData,
    MoneyEarned: MoneyEarnedMockData,
    SavingsGoal: MockSavingsGoalData,
    ExpensesPeriod: ExpensesPeriodMockData
};

const financialDataString = JSON.stringify(financialData);

const getFullLanguageName = (code) => {
    switch (code) {
        case 'en':
            return 'English';
        case 'es':
            return 'Spanish';
        // Add more cases as needed
        case 'fr':
            return 'French';
        default:
            return 'en'; // Return english if no match is found
    }
};

const CustomChatStep = (props) => {
    const { t, i18n} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const { trigger, steps } = props;
        const userMessage = steps.userInput ? steps.userInput.value : '';

        if (trigger === 'sendFinancialData') {
            const languageCode = i18n.language || 'en';;
            const languageName = getFullLanguageName(languageCode);
            const formattedMessage = t('Analyze these financials and give a breakdown and summary of them. Highlight any trends that you see in the data and compare them to other trends to provided better analysis. Send the analysis in markdown language. Respond in {{language}}.', { language: languageName });
            sendMessageToBackend(formattedMessage, financialDataString);
        } else {
            sendMessageToBackend(userMessage);
        }
    }, []);

    const sendMessageToBackend = async (userMessage) => {
        setLoading(true);
        try {
            const responseMessage = await sendMessage(userMessage, financialDataString);
            setMessage(responseMessage);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessage(t('Error communicating with the backend.'));
        } finally {
            setLoading(false);
            triggerNextStep();
        }
    }

    const triggerNextStep = () => {
        props.triggerNextStep({ trigger: 'askContinue' });
    }

    if (loading) {
        return <div>...</div>;
    }

    return (
        <ReactMarkdown>{message}</ReactMarkdown>
    );
}

export default CustomChatStep;

