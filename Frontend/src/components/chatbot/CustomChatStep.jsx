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


const financialDataString = JSON.stringify(financialData);

class CustomChatStep extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, message: '' };
    }

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

    triggerNextStep() {
        // Trigger the next step in the chatbot
        this.props.triggerNextStep({ trigger: 'askContinue' }); 
    }

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