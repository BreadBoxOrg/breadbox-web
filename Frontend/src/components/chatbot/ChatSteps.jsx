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
import { useTranslation } from 'react-i18next';

const Steps = () => {

      const { t } = useTranslation();

      //steps array for the chatbot
      const steps = [
        { id: '0', 
          message: t('chatbot.welcome'),
          trigger: 'tutorialOption',
        },
        {
          id: 'tutorialOption', //options for the user to select
          options: [
              { value: 'tt', label: t('chatbot.labels.chatbot-tt'), trigger: 'chatTutorial' },
              { value: 'bb', label: t('chatbot.labels.breadBox'), trigger: 'bbTutorial' },
              { value: 'af', label: t('chatbot.labels.analyze'), trigger: 'sendFinancialData' },
              { value: 'no', label: t('chatbot.labels.continue'), trigger: 'userInput' },

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
          message: t('chatbot.tutorials.chatTutorial'),
          trigger: 'askContinue'
        },
        {
          id: 'bbTutorial', //BreadBox tutorial
          message: t('chatbot.tutorials.bbTutorial'),
          trigger: 'continueBBTutorial'
        },
        {
          id: 'continueBBTutorial', //continue BreadBox tutorial
          message: t('chatbot.tutorials.continueBBTutorial'),
          trigger: 'askContinue'
        },
        {
          id: 'sure', //user input
          message: t('chatbot.sure'),
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
          message: t('chatbot.askContinue'),
          trigger: 'continueDecision',
        },
        {
          id: 'continueDecision', //options for the user to select
          options: [
            { value: 'yes', label: t('chatbot.yes'), trigger: 'sure' },
            { value: 'no', label: t('chatbot.no'), trigger: 'endConversation' },
          ],
        },
        {
          id: 'endConversation', //end conversation
          message: t('chatbot.endConversation'),
          end: true,
        },
    ];

  return steps;
}

export default Steps;