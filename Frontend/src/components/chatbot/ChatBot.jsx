import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import CustomChatStep from './CustomChatStep.jsx';
import logo from '../../images/BreadBox_Logo.svg'
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
// import logo from '../../images/BreadBox_Logo.png';
import styled from 'styled-components';

const theme = {
    background: 'linear-gradient(180deg, black 45%, #98F2C1 150%)',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#1ADBA9',
    headerFontColor: '222222',
    headerFontSize: '20px',
    botBubbleColor: '#1ADBB0',
    botFontColor: '#1e1e1e',
    userBubbleColor: '#beffee',
    userFontColor: '#1e1e1e',
    footerColor: '#2ecc71',
    botAvatar: logo,
};

//custom chatbot styling
const StyledChatBot = styled(ChatBot)`
    .rsc-ts-bot{
      margin-top: 5px;
    }
    .rsc-container {
      height: 80vh;
      width: 22vw; //adjust chatbot container based off screen size
    }
    .rsc-ts-bubble {
      font-size: 16px;
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
    .rsc-os-option-element {
      margin-top: 5px;
      font-size: 16px;
    }
    .rsc-os-options {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      align-items: flex-end;
    }
  `;

const steps = [
    { id: '0', 
      message: 'Welcome to BreadBox! How can assist you on your financial journey today?🤖💰',
      trigger: 'tutorialOption',
    },
    {
      id: 'tutorialOption',
      options: [
          { value: 'tt', label: 'Chatbot Tutorial', trigger: 'chatTutorial' },
          { value: 'bb', label: 'Breadbox Tutorial', trigger: 'bbTutorial' },
          { value: 'no', label: 'Continue Asking Questions', trigger: 'userInput' },
      ],
    },
    {
      id: 'chatTutorial',
      message: 'I am your personal financial assistant. You can ask me questions about your finances, and I will do my best to help you out!',
      trigger: 'askContinue'
    },
    {
      id: 'bbTutorial',
      message: `BreadBox is a financial management tool that helps you track your spending, income, and savings in one spot across multiple banks. You can also use it to set financial goals and track your progress. We also provide a chatbot to help you with any questions you may have.`,
      trigger: 'continueBBTutorial'
    },
    {
      id: 'continueBBTutorial',
      message: 'For Alpha, we have set up a test account for you to use. Access through settings by clicking the "connect your account button". Select any banking institution and enter "user_good" and "password_good" for the password when prompted. Enter "1111" for the MFA code and select any bank accounts to link. Agree to terms and condtitions. When done click out and view your transactions, income, and accounts on the dashboard.',
      trigger: 'askContinue'
    },
    {
      id: 'sure',
      message: 'Sure!',
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
        { value: 'yes', label: 'Yes, please.😃', trigger: 'sure' },
        { value: 'no', label: 'No, thanks!😁', trigger: 'endConversation' },
      ],
    },
    {
      id: 'endConversation',
      message: 'Thank you for chatting with us. Have a great day! 🤍',
      end: true,
    },
];

const config = {
  // botAvatar: logo,
  floating: true,
};

function ChatBotAssistant() {
    return (
      <Draggable>
        <ResizableBox width={300} height={400}>
          <ThemeProvider theme={theme}>
            <StyledChatBot 
              headerTitle="BreadBox Assistant"
              steps={steps}
              botAvatar={logo}
              userAvatar="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" //get rid of the user default avatar
              floating={true}
            />
          </ThemeProvider>
        </ResizableBox>
      </Draggable>
    );
}

export default ChatBotAssistant;