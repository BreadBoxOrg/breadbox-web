import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import CustomChatStep from './CustomChatStep.jsx';

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#3f51b5',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3f51b5',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    };

    const steps = [
        { id: '0', 
          message: 'Welcome to BreadBox! How can I help you today?',
          trigger: 'userInput',
        },
        {
          id: 'userInput',
          user: true,
          trigger: 'sendMessage',
        },    
        {
          id: 'sendMessage',
          component: <CustomChatStep />,
          asMessage: true,
          waitAction: true,
          trigger: 'askContinue'
        },
        {
          id: 'askContinue',
          message: 'Do you want to say anything else?',
          trigger: 'continueDecision',
        },
        {
          id: 'continueDecision',
          options: [
            { value: 'yes', label: 'Yes', trigger: 'userInput' },
            { value: 'no', label: 'No', trigger: 'endConversation' },
          ],
        },
        {
          id: 'endConversation',
          message: 'Thank you for chatting with us. Have a great day!',
          end: true,
        },
    ];

    const config = {
        botAvatar: "../images/BreadBox_Logo.png",
        floating: true,
    };

    function ChatBotAssistant() {

        return (
            <ThemeProvider theme={theme}>
                <ChatBot 
                headerTitle="BreadBox ChatBot"
                steps={steps}
                {...config} 
                />
            </ThemeProvider>
        );
    }

    export default ChatBotAssistant;