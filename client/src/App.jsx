import Header from "./componenets/header"
import mancity from './assets/manCity.svg'
import manunited from './assets/manUnited.jpg'
import arsenal from './assets/Arsenal.jpg'
import { useNavigate } from "react-router-dom";


function App() {

  const navigate = useNavigate();
  return (
    <>
      <div className=" ">
      <Header/>
      <div>
        <h1 className=" text-4xl text-center m-10"> Join Your Favourite Club Group</h1>
      </div>
      <h1  onClick={() => {navigate('/register')}}
            className=" text-center bg-gradient-to-r from-sky-500 to-blue-500 p-3 rounded-md  w-1/4 mx-auto cursor-pointer "
        >Get Started</h1>
      <div className=" flex justify-center items-center  gap-5 md:mt-20">
        <div className=" flex flex-col text-center rounded-2xl shadow-md bg-red-500  md:w-3/12 h-80 " 
        
        >
           <img src={arsenal}
           className="h-64 w-fit"
           ></img>
           <h1 className=" bg-red-500 p-5 rounded-2xl">Join Arsenal group</h1>
        </div>
        <div className="  bg-blue-200 flex flex-col text-center rounded-2xl shadow-md md:w-3/12 h-80"
         
        >
           <img src={mancity}
           className=" h-64 w-fit pl-12"></img>
           <h1 className=" bg-blue-300 p-5 rounded-2xl">Join Mancity group</h1>
        </div>
        <div className=" flex flex-col text-center rounded-2xl shadow-md bg-red-500  md:w-3/12 h-80"
          
        >
           <img src={manunited}
             className="h-64 w-fit"
           ></img>
           <h1 className=" bg-red-500 p-5 rounded-2xl">Join Man united group</h1>
        </div>
        
      </div>
      
      </div>
      
      
    </>
  )
}

export default App

