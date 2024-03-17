import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import CustomChatStep from './CustomChatStep.jsx';
import logo from '../../images/BreadBox_Logo.svg'
// import logo from '../../images/BreadBox_Logo.png';
import styled from 'styled-components';

const theme = {
    background: 'black',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#1ADBA9',
    headerFontColor: '#1e1e1e',
    headerFontSize: '15px',
    botBubbleColor: '#1ADBB0',
    botFontColor: '#1e1e1e',
    userBubbleColor: '#beffee',
    userFontColor: '#1e1e1e',
    footerColor: '#2ecc71',
    botAvatar: logo,
    };
    //custom chatbot styling
    const StyledChatBot = styled(ChatBot)`
    .rsc-container {
      height: 80vh;
      width: 22vw; //adjust chatbot container based off screen size
    }
    .rsc-content {
      height: calc(100% - 110px); //height of the input field
      overflow-y: auto;
    }
    .rsc-submit-button {  
      margin-top: 0px;
    }
    .rsc-footer { 
      position: sticky;
    }
    .rsc-input {
      background-color: #beffee;
      margin-top: 0px;
      position: absolute;
      color: black; 
    }
    .rsc-ts-user-image {
      display: none;
    }
`;

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
          message: 'Can I provide further assistance?',
          trigger: 'continueDecision',
        },
        {
          id: 'continueDecision',
          options: [
            { value: 'yes', label: 'Yes, please.', trigger: 'userInput' },
            { value: 'no', label: 'No, thanks!', trigger: 'endConversation' },
          ],
        },
        {
          id: 'endConversation',
          message: 'Thank you for chatting with us. Have a great day!',
          end: true,
        },
    ];

    const config = {
        // botAvatar: logo,
        floating: true,
    };

    function ChatBotAssistant() {

        return (
          // <ChatBotContainer>
            <ThemeProvider theme={theme}>
                <StyledChatBot 
                headerTitle="BreadBox Assistant"
                steps={steps}
                botAvatar={logo}
                userAvatar="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" //get rid of the user default avatar
                floating={true}
                />
            </ThemeProvider>
          //  </ChatBotContainer>
        );
    }

    export default ChatBotAssistant;