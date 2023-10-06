/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {PaperPlaneRight} from 'phosphor-react'

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    // Set up the event listener
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };
  
    socket.on("receive_message", receiveMessageHandler);
  
    // Remove the event listener when the component unmounts
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);
  
  
  return (
    <div className=" flex justify-center  mt-10" >
        
     <div className=" bg-white w-2/3   flex flex-col shadow-lg">
     <div className=" text-2xl">
        <p>Live Chat</p>
       </div>
      <div className=" flex-grow">
        <ScrollToBottom className=" max-h-5/6 overflow-y-scroll overflow-x-hidden ">
          {messageList.map((messageContent) => {
            return (
              <div
              className={`message ${
                username === messageContent.author ? 
                'bg-blue-500 m-3 rounded-md  p-2 w-auto max-w-md  ' : 
                'bg-green-500 m-3 mr-20 rounded-md md:mr-40 p-2 w-auto max-w-md'
              }`}
                key={messageContent.time}
              >
                <div className="">
                  <div className=" text-xl">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="flex justify-between">
                    <p id="author">{messageContent.author}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="flex   gap-3">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          className=' m-5 mr-0 p-3 flex-grow rounded-md shadow-md h-14'
        />
        <PaperPlaneRight size={32}  className=' h-14 w-auto bg-blue-500 p-2 rounded-md m-5 ml-0 text-white' onClick={sendMessage}/>
      </div>
      </div>
    </div>
  );
}

export default Chat;