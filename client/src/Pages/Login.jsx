/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import Header from "../componenets/header";




 function Login() {
    axios.defaults.baseURL = 'http://localhost:3005';
    axios.defaults.withCredentials = true;
    const [user, setUser] = useState({username: '',password: ''})
    const [errors, setErrors] = useState({email: '',password: ''});
    
  
    const handleOnchange = (e) =>{
        const {name, value} = e.target;
        setUser ((prev) => ({
            ...prev, 
            [name]: value,
        }))
    }
    // ... (previous code)

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/login', {
          username: user.username,
          password: user.password,
        });
        // Handle successful login or redirection to '/profile'
        window.location.href = '/joingroup';
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 401) {
            // Handle 401 (Unauthorized) response with error message
            if (data.error === 'Invalid username') {
              setErrors({ username: 'Invalid username' });
            } else if (data.error === 'Invalid password') {
              setErrors({ password: 'Invalid password' });
            }
          } else {
            setErrors({ general: 'An error occurred during login.' });
          }
        } else {
          setErrors({ general: 'An error occurred. Please try again later.' });
        }
      }
      

      setUser({username: "" , password: ""})
      
  };
  
  // ... (rest of your code)
  
      
    const navigate = useNavigate();
  return (
    <>
    <Header/>
    <div className=" flex justify-center items-center mt-8">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 rounded-md shadow-xl w-96 h-auto ">
        <h2 className="text-center mt-10  text-2xl font-bold leading-9 tracking-tight text-gray-900" >Sign-in</h2>
        <form className=" space-y-3" onSubmit={handleSubmit}>
            <div>
            <label htmlFor = "username"
            className="block text-sm font-medium leading-6 text-gray-900" >
                Username
            </label>
            <input
            className=" my-3  block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
            required
            name="username"
            type="text"
            placeholder="Enter username"
            value={user.username}
            onChange={handleOnchange}
            >
            </input>
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div>
            <label htmlFor="password"
             className="block text-sm font-medium leading-6 text-gray-900"
            >
                Password
            </label>
            <input  className=" my-3 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
             required
             type="password"
             name="password"
             placeholder="Enter password"
             value={user.password}
             onChange={handleOnchange}>
            </input>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
           <button type="submit" 
             className=" mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
              Sign-in
           </button>
           </div>
        </form>
        <div>
            <p className="mt-10 text-center text-sm text-gray-500">
                don't have account? &nbsp;
                <span className=" pr-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                 onClick={() => {navigate('/register')}}
                >
                    Sign-up</span></p>
        </div>
      </div>
      </div>
    </>
  )
    
    
}

export default Login;