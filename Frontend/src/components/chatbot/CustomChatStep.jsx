/*
  * File: 
    * CustomChatStep.jsx

  * Description: 
    * This file contains the custom chat step component for the chatbot.
    * It uses the ChatStep component from the react-simple-chatbot library.
    * The CustomChatStep component is used to generate responses for the chatbot.
    * This is also used to send financial data to the chatbot.
*/

import React, { Component } from 'react';
import { sendMessage } from './sendchat';
import { RecentRecurringMockData, MoneyEarnedMockData, MockSavingsGoalData, ExpensesPeriodMockData } from '../mock_data/mockData.js';
import ReactMarkdown from 'react-markdown';

const financialData = {
    RecentRecurring: RecentRecurringMockData,
    MoneyEarned: MoneyEarnedMockData,
    SavingsGoal: MockSavingsGoalData,
    ExpensesPeriod: ExpensesPeriodMockData
  };

// Convert the financial data to a string
const financialDataString = JSON.stringify(financialData);

// Custom chat step component
class CustomChatStep extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, message: '' };
    }
    // Send the message to the backend when the component mounts
    componentDidMount() {
        const { trigger } = this.props;
        const userMessage = this.props.steps.userInput ? this.props.steps.userInput.value : '';
        console.log(trigger, userMessage);
        if (trigger === 'sendFinancialData') {
            this.sendMessageToBackend("Analyze these financials and give a breakdown and summary of them. Highlight any trends that you see in the data and compare them to other trends to provided better analysis. Send the analysis in markdown language.", financialDataString);
        } else {
            this.sendMessageToBackend(userMessage);
        }
    }
    // Send the message to the backend
    async sendMessageToBackend(message, financialData) {
        this.setState({ loading: true });
        try {
            console.log(financialData);
            const responseMessage = await sendMessage(message, financialData);
            this.setState({ loading: false, message: responseMessage });
            this.triggerNextStep();
        } catch (error) {
            console.error("Error sending message:", error);
            this.setState({ loading: false, message: "Error communicating with the backend." });
            this.triggerNextStep();
        }
    }
    // Trigger the next step in the chatbot
    triggerNextStep() {
        // Trigger the next step in the chatbot
        this.props.triggerNextStep({ trigger: 'askContinue' }); 
    }
    // Render the component - either loading or the message
    render() {
        const { loading, message } = this.state;

        if (loading) {
            return <div>...</div>;
        }

        return (
            <ReactMarkdown>{message}</ReactMarkdown>
        );
    }
}

export default CustomChatStep;