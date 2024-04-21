/*
  * File: 
    *CustomChatStep.jsx

  * Description: 
    * This file contains the custom chat step component for the chatbot.
    * It uses the ChatStep component from the react-simple-chatbot library.
    * The CustomChatStep component is used to generate responses for the chatbot.
    * This is also used to send financial data to the chatbot.
    * Creates quick replies for the user to select.
*/
import CustomChatStep from './CustomChatStep.jsx';

//steps array for the chatbot
export const steps = [
    { id: '0', 
      message: 'Welcome to BreadBox! How can assist you on your financial journey today?🤖💰',
      trigger: 'tutorialOption',
    },
    {
      id: 'tutorialOption', //options for the user to select
      options: [
          { value: 'tt', label: 'Chatbot Tutorial', trigger: 'chatTutorial' },
          { value: 'bb', label: 'Breadbox Tutorial', trigger: 'bbTutorial' },
          { value: 'af', label: 'Analyze My Financials', trigger: 'sendFinancialData' },
          { value: 'no', label: 'Continue Asking Questions', trigger: 'userInput' },

      ],
    },
    {
      id: 'sendFinancialData', //sends financial data to the chatbot
      component: <CustomChatStep trigger='sendFinancialData'/>,
      asMessage: true,
      waitAction: true,
      trigger: 'askContinue',
  },

    {
      id: 'chatTutorial', //chatbot tutorial
      message: 'I am your personal financial assistant. You can ask me questions about your finances, and I will do my best to help you out!',
      trigger: 'askContinue'
    },
    {
      id: 'bbTutorial', //BreadBox tutorial
      message: `BreadBox is a financial management tool that helps you track your spending, income, and savings in one spot across multiple banks. You can also use it to set financial goals and track your progress. We also provide a chatbot to help you with any questions you may have.`,
      trigger: 'continueBBTutorial'
    },
    {
      id: 'continueBBTutorial', //continue BreadBox tutorial
      message: 'For Alpha, we have set up a test account for you to use. Access through settings by clicking the "connect your account button". Select any banking institution and enter "user_good" and "password_good" for the password when prompted. Enter "1111" for the MFA code and select any bank accounts to link. Agree to terms and condtitions. When done click out and view your transactions, income, and accounts on the dashboard.',
      trigger: 'askContinue'
    },
    {
      id: 'sure', //user input
      message: 'Sure!',
      trigger: 'userInput',
    },
    {
      id: 'userInput',
      user: true,
      trigger: 'sendMessage',
    },    
    {
      id: 'sendMessage', //send user message to chatbot
      component: <CustomChatStep />,
      asMessage: true,
      waitAction: true,
      trigger: 'askContinue'
    },
    {
      id: 'askContinue', //ask user if they need further assistance
      message: 'Can I provide further assistance?',
      trigger: 'continueDecision',
    },
    {
      id: 'continueDecision', //options for the user to select
      options: [
        { value: 'yes', label: 'Yes, please.😃', trigger: 'sure' },
        { value: 'no', label: 'No, thanks!😁', trigger: 'endConversation' },
      ],
    },
    {
      id: 'endConversation', //end conversation
      message: 'Thank you for chatting with us. Have a great day! 🤍',
      end: true,
    },
];