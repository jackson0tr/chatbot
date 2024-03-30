

import React, { useState } from 'react';
import './chatbot.css';
import data from './data.json'
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Grid, Typography } from '@mui/material';

const Chatbot = () => {

   const [messages, setMessages] = useState([]);

  const handleQuestionClick = (answer) => {
    setMessages([...messages, { text: answer, isBot: true }]);
  };


  return (
    <>
      <button className="chatbot-toggler" onClick={() => document.body.classList.toggle("show-chatbot")}>
        <span className="material-symbols-rounded"><ChatBubbleIcon/></span>
        <span className="material-symbols-outlined"><CloseIcon/></span>
      </button>
      <div className="chatbot">
        <header>
          <h2>Chatbot</h2>
          <span className="close-btn material-symbols-outlined" onClick={() => document.body.classList.remove("show-chatbot")}><CloseIcon/></span>
        </header>
        <div className="chatbot-container">
        <div className="chatbot-options">
         {data.map((item, index) => (
            <button
            key={index}
            onClick={() => handleQuestionClick(item.answer)}
            className="option-button"
          >
            {item.question}
          </button>
        ))}
      </div>

      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
            {message.text}
          </div>
        ))}
      </div>
        </div>
  
      </div>
      {/* <Box className="chatbot" sx={{
        maxHeight: "600px",
        position: "fixed",
        right: "35px",
        bottom: "90px",
        width: "420px",
        background: "#fff",
        borderRadius: "15px",
        overflow: "hidden",
        opacity: "0",
        pointerEvents: "none",
        transform: "scale(0.5)",
        transformOrigin: "bottom right",
        boxShadow: "0 0 128px 0 rgba(0,0,0,0.1), 0 32px 64px -48px rgba(0,0,0,0.5)",
        transition: "all 0.1s ease",
      }}>
        
        <header>
          <h2>Chatbot</h2>
          <Typography className="close-btn material-symbols-outlined" onClick={() => document.body.classList.remove("show-chatbot")}><CloseIcon/></Typography>
        </header>
        <Container className="chatbot-container" sx={{
          maxWidth: "300px",
          padding: "10px",
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <Container className="chatbot-options" sx={{
            padding: "10px",
            maxHeight: "300px",
            overflowY: "auto",
          }}>
              {data.map((item, index) => (
            <button
            key={index}
            onClick={() => handleQuestionClick(item.answer)}
            className="option-button"
          >
            {item.question}
          </button>
           ))}
          </Container>
          <Container className="chatbot-messages" sx={{
            padding: "20px",
            maxHeight: "300px",
            overflowY: "auto",
          }}>
              {messages.map((message, index) => (
          <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
            {message.text}
          </div>
            ))}
          </Container>
        </Container>
        
      </Box> */}

    </>

  );
}

export default Chatbot;
