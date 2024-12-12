import React, { useState } from 'react'
import "./App.css"
import { IoCodeSlash, IoSend } from 'react-icons/io5'
import { BiPlanet } from 'react-icons/bi'
import { FaPython } from 'react-icons/fa'
import { TbMessageChatbot } from 'react-icons/tb'
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]); 
  let allMessages = [];

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    }
    else {
      alert("You must write somthing... !")
    }
  };

  
  const generateResponse = async (msg) => {
    if (!msg) return;
    
    const genAI = new GoogleGenerativeAI("AIzaSyAkjTqym0lTZpmIHyISL7QZC7jyt9tL9iA");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    
    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];
    
    setMessages(newMessages); // Append new messages to the existing ones
    setisResponseScreen(true);
    setMessage(""); // Clear the input field after sending the message
    console.log(result.response.text());
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]); // Clear the messages array
  }

  return (
    <>
      <div className="container w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
        {
          isResponseScreen ?
            <div className='h-[80vh]'>
              <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px]">
                <h2 className='text-2xl'>Ihsan AI</h2>
                <button id='newChatBtn' className='bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]' onClick={newChat}>New Chat</button>
              </div>

              <div className="messages">
              {
                messages?.map((msg, index) => {
                  return (
                    <div key={index} className={msg.type}>{msg.text}</div>
                  )
                })
              }
                {/* <div className="userMsg">You : What is the HTML stand for</div>
                <div className="responseMsg">HTML stand for Hyper Text Markup Language</div> */}
              </div>
            </div> :
            <div className="middle h-[80vh] flex items-center flex-col justify-center">
              <h1 className='text-4xl'>Ihsan AI</h1>
              <div className="boxes mt-[30px] flex items-center gap-2">
              </div>
            </div>
        }


        <div className="bottom w-[100%] flex flex-col items-center">
          <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
            <input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className='p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' placeholder='Write your message here...' id='messageBox' />
            {
              message == "" ? "" : <i className='text-green-500 text-[20px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>
            }
          </div>
          <p className='text-[gray] text-[14px] my-4'>Ihsan AI is developed by V.N.Shameemur Ridwan this AI can make mistakes please check important information  </p>
        </div>
      </div>
    </>
  )
}

export default App
