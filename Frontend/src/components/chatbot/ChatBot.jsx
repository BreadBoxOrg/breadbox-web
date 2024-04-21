/*
  File: ChatBot.jsx

  Description:
    *This file is the main file for the chatbot. It uses the ChatBot component from the react-simple-chatbot library.
    *The chatbot is a floating chatbot that can be dragged around the screen. It uses the OpenAI API to generate responses.
    *has a header title, a bot avatar, a user avatar, and a placeholder for the user to type a message.
    *has a theme that is used to style the chatbot.
    *has steps that are used to generate responses.
*/

import { ThemeProvider } from 'styled-components';
import logo from '../../images/BreadBox_Logo.svg';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import { StyledChatBot, theme } from './ChatBotStyles.jsx';
import Steps from './ChatSteps.jsx';  
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function ChatBotAssistant() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { t } = useTranslation();

  //resizes the chatbot according to the window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setPosition(prevPosition => {
        const newPosition = { ...prevPosition };
        if (newPosition.x < -windowWidth + 400) {
          newPosition.x = -windowWidth + 400;
        }
        return newPosition;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  //makes the chatbot draggable
  const handleDrag = (e, ui) => {
    const { x } = position;
    setPosition({ x: x + ui.deltaX, y: 0 });
  };

  //returns the chatbot
  return (
    <Draggable axis="x" bounds={{ left: -windowWidth + 400, right: 0 }} position={position} onDrag={handleDrag}>
      <div style={{ borderRadius: '20px' }}>
        <ThemeProvider theme={theme}>
          <StyledChatBot 
            headerTitle="AI BreadBot"
            steps={Steps()}
            botAvatar={logo}
            userAvatar="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" //get rid of the user default avatar
            floating={true}
            placeholder={t('chatbot.placeholder')}
          />
        </ThemeProvider>
        </div>
    </Draggable>
  );
}

export default ChatBotAssistant;