import React, { Component } from 'react';
import { sendMessage } from '../../utils/sendchat'; 

class CustomChatStep extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, message: '' };
    }

    componentDidMount() {
        const { steps } = this.props;
        const userMessage = steps.userInput.value; 
        this.sendMessageToBackend(userMessage);
    }

    async sendMessageToBackend(message) {
        this.setState({ loading: true });
        try {
            const responseMessage = await sendMessage(message);
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
            return <div>Sending message...</div>;
        }

        return (
            <div>{message}</div>
        );
    }
}

export default CustomChatStep;