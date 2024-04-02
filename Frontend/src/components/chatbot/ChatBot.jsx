import { ThemeProvider } from 'styled-components';
import logo from '../../images/BreadBox_Logo.svg';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import { StyledChatBot, theme } from './ChatBotStyles.jsx';
import { steps }  from './ChatSteps.jsx';  
import React, { useState, useEffect } from 'react';

function ChatBotAssistant() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const handleDrag = (e, ui) => {
    const { x } = position;
    setPosition({ x: x + ui.deltaX, y: 0 });
  };

  return (
    <Draggable axis="x" bounds={{ left: -windowWidth + 400, right: 0 }} position={position} onDrag={handleDrag}>
      <div style={{ borderRadius: '20px' }}>
        <ThemeProvider theme={theme}>
          <StyledChatBot 
            headerTitle="AI BreadBot"
            steps={steps}
            botAvatar={logo}
            userAvatar="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" //get rid of the user default avatar
            floating={true}
            placeholder="Type a message..."
          />
        </ThemeProvider>
        </div>
    </Draggable>
  );
}

export default ChatBotAssistant;