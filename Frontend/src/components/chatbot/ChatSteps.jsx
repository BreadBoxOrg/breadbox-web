
import CustomChatStep from './CustomChatStep.jsx';
import { useTranslation } from 'react-i18next';

const Steps = () => {

      const { t } = useTranslation();
      const steps = [
        { id: '0', 
          message: t('chatbot.welcome'),
          trigger: 'tutorialOption',
        },
        {
          id: 'tutorialOption',
          options: [
              { value: 'tt', label: t('chatbot.labels.chatbot-tt'), trigger: 'chatTutorial' },
              { value: 'bb', label: t('chatbot.labels.breadBox'), trigger: 'bbTutorial' },
              { value: 'af', label: t('chatbot.labels.analyze'), trigger: 'sendFinancialData' },
              { value: 'no', label: t('chatbot.labels.continue'), trigger: 'userInput' },

          ],
        },
        {
          id: 'sendFinancialData',
          component: <CustomChatStep trigger='sendFinancialData'/>,
          asMessage: true,
          waitAction: true,
          trigger: 'askContinue',
      },

        {
          id: 'chatTutorial',
          message: t('chatbot.tutorials.chatTutorial'),
          trigger: 'askContinue'
        },
        {
          id: 'bbTutorial',
          message: t('chatbot.tutorials.bbTutorial'),
          trigger: 'continueBBTutorial'
        },
        {
          id: 'continueBBTutorial',
          message: t('chatbot.tutorials.continueBBTutorial'),
          trigger: 'askContinue'
        },
        {
          id: 'sure',
          message: t('chatbot.sure'),
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
          message: t('chatbot.askContinue'),
          trigger: 'continueDecision',
        },
        {
          id: 'continueDecision',
          options: [
            { value: 'yes', label: t('chatbot.yes'), trigger: 'sure' },
            { value: 'no', label: t('chatbot.no'), trigger: 'endConversation' },
          ],
        },
        {
          id: 'endConversation',
          message: t('chatbot.endConversation'),
          end: true,
        },
    ];

  return steps;
}

export default Steps;