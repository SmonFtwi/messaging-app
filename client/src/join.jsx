import Chat from "./Pages/chat";
import { useState , useEffect } from "react";
import io from "socket.io-client"
import Header from "./componenets/header";
import mancity from './assets/manCity.svg'
import manunited from './assets/manUnited.jpg'
import arsenal from './assets/Arsenal.jpg'
import axios from "axios";

const socket = io.connect("http://localhost:3005");
function JoinGroup() {
    axios.defaults.baseURL = 'http://localhost:3005';
    axios.defaults.withCredentials = true;
    const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  useEffect(() => {
    axios.get('/getUser')
      .then((response) => {
        if (response.data) {
          setUsername(response.data.username);
         // Set the loggedInUser state
        } else {
          window.location.href = '/login';
          console.log('User is not authorized');
        }
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
  }, []);

  const getRoomNumber = (num) => {
    setRoom(num)
     
  }

  return (
    
    <div className="flex flex-col h-screen ">
        <Header/>
      {!showChat ? (
        <div>
        <div>
        <h1 className=" text-4xl text-center m-10"> Join Your Favourite Club Group</h1>
      </div>
      <div className=" flex justify-center items-center  gap-5 md:mt-20">
        <div className=" flex flex-col text-center rounded-2xl shadow-md bg-red-500  md:w-3/12 h-80 cursor-pointer" 
       onClick={() => getRoomNumber(10)}
        >
           <img src={arsenal}
           className="h-64 w-fit"
           ></img>
           <h1 className=" bg-red-500 p-5 rounded-2xl">Join Arsenal group</h1>
        </div>
        <div className="  bg-blue-200 flex flex-col text-center rounded-2xl shadow-md md:w-3/12 h-80 cursor-pointer"
        onClick={() => getRoomNumber(20)}
        >
           <img src={mancity}
           className=" h-64 w-fit pl-12"></img>
           <h1 className=" bg-blue-300 p-5 rounded-2xl">Join Mancity group</h1>
        </div>
        <div className=" flex flex-col text-center rounded-2xl shadow-md bg-red-500  md:w-3/12 h-80 cursor-pointer"
         onClick={() => getRoomNumber(30)}
        >
           <img src={manunited}
             className="h-64 w-fit"
           ></img>
           <h1 className=" bg-red-500 p-5 rounded-2xl">Join Man united group</h1>
        </div>
      </div>
        <h1 onClick={joinRoom}
            className="bg-gradient-to-r from-sky-500 to-blue-500 p-3 rounded-md mx-auto cursor-pointer w-1/4 mt-10 text-center"
        >Join Group</h1>
      </div>
     
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}



export default JoinGroup
