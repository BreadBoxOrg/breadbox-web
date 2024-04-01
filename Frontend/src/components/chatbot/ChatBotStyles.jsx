import logo from '../../images/BreadBox_Logo.svg';
import styled from 'styled-components';
import ChatBot from 'react-simple-chatbot';


export const theme = {
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
export const StyledChatBot = styled(ChatBot)`
    .rsc-ts-bot {
      margin-top: 5px;
    }
    .rsc-container {
      height: 80vh;
      width: 22vw; // Existing width setting for larger screens
      min-width: 400px;

    }
    .rsc-ts-bubble {
      font-size: 16px;
    }
    .rsc-content {
      height: calc(100% - 110px); // Existing height adjustment
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
    
    // adj for mobile
    @media only screen and (max-width: 768px) {
        .rsc-container {
            width: 80vw; 
            height: 60vh; 
            min-width: 400px;
            min-height: 400px;

        }
    }
`;
