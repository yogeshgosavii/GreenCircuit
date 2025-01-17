import React, { useEffect } from 'react'
import {Link, useNavigate,useLocation,useParams} from 'react-router-dom'

import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import { login as authLogin, logout } from '../store/authSlice'
import {useForm} from "react-hook-form"
import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import {useSelector} from 'react-redux'
import user_with_phone from '../assets/user_with_phone.png'
import service from '../appwrite/config'


function Login() {
    const dispatch = useDispatch()
    const {register, handleSubmit,setFocus} = useForm()
    const [emailCheck, setemailCheck] = useState(false);
    const [passwordCheck, setpasswordCheck] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [showPassword, setshowPassword] = useState(false);

    const [label, setlabel] = useState(window.location.pathname.split("/"));

    const [loader, setloader] = useState(false);
    

    const validateEmail = (email) => {
        // Regular expression to validate email format
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const login = async () => {
        setError("");
        setFocus()
        setloader(true)
        console.log("Logging in");
        const email = document.getElementById("userEmail").value;
        const password = document.getElementById("userPassword").value;
        const error =  document.getElementById("error");
        try {
            //create a user session
            error.classList.add('invisible')
            const token = await authService.login({email,password});
        
            console.log(token);
            if (token) {
                const user = await authService.getCurrentUser();
                dispatch(authLogin({userData : user}));

                navigate("/news")
                const userDetails = await service.getUserDetails(user.userId);
                console.log(user);


            }
        } catch (e) {
            document.getElementById("error").value = e.message;
            error.classList.remove("invisible")
        }
        finally{
            setloader(false)

        }
    };
    
      
    
  return (
    <div className='h-full'>
        <div className='flex flex-col items-center text-gray-800  justify-center mt-10 w-full  h-full '>
            <div class="fixed top-0 left-0 w-full bg-white p-4 flex justify-between items-center px-10 font-sans text-xl">
                <div className='font-semibold '></div>
                <div className='flex flex-row gap-9  text-lg font-semibold items-center'>
                    {
                        label.includes("organization")?
                        <Link to={"/organization/registration"} className='cursor-pointer'>Register</Link>
                        :
                        <Link to={"/user/registration"} className='cursor-pointer'>Register</Link>
                    }
                </div>
            </div>
            <div className=' rounded-3xl bg-white flex flex-row '>
                <div className= 'min-w-fit w-96  p-10 border duration-200'>
                    {
                        label.includes("organization")?
                        <h2 className="text-2xl font-semibold leading-tight">Admin Login</h2>
                        :
                        <h2 className="text-2xl font-semibold leading-tight">User Login</h2>
                        
                    }
                    <p className='text-gray-400 text-sm font-normal'>Enter your registered email and password</p>
                    <p id='error'   className={`text-red-500 px-2 mt-1 w-fit rounded-sm text-sm bg-red-50  invisible`}>error</p>
                        

                    {/* {error && <p className="text-red-600 bg-red-50 mt-1 text-sm font-normal w-fit px-2 py-1 transition ease-in-out duration-200  rounded-sm">{error}</p>} */}

                    <form onSubmit={handleSubmit(login)} className='mt-10 '>
                        <div class="relative flex peer">
                            <input 
                                type="text" 
                                id="userEmail" 
                                onChange={(e)=>{
                                    if (validateEmail(e.target.value)) {
                                        setemailCheck(true)
                                    }
                                    else{
                                        setemailCheck(false)
                                    }
                                }}
                                className="block px-3 py-3 w-full font-normal   bg-white rounded-sm  border appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                style={{ 
                                    "-webkit-autofill": "number",
                                    "-webkit-box-shadow": "0 0 0px 1000px white inset", 
                                }}  
                                placeholder=""
                            
                                title="Email address"
                            />
                            <label for="userEmail" class="absolute duration-200 cursor-text  px-2 text-gray-400 bg-white  font-normal transform -translate-y-5 scale-90 top-2 z-10   peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email address</label>
                        </div>
                           
                        <div class="relative flex peer mt-5">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="userPassword" 
                                onFocus={()=>{
                                    document.getElementById("passwordEye").classList.remove("text-gray-300");
                                    document.getElementById("passwordEye").classList.add("text-blue-500")
                                }}
                                onBlur={() => {
                                    document.getElementById("passwordEye").classList.remove("text-blue-500");
                                    document.getElementById("passwordEye").classList.add("text-gray-300")
                                }}
                                title='Password'
                                class="flex-1 block px-3 py-3 font-normal bg-white rounded-sm border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                onChange={(e)=>{
                                    if (e.target.value.length >=6) {
                                        setpasswordCheck(true)
                                    }else{
                                        setpasswordCheck(false)
                                    }
                                }}
                            />
                            <label 
                                for="userPassword" 
                                class="absolute duration-200 cursor-text px-2 text-gray-400 bg-white font-normal transform -translate-y-5 scale-90 top-2 z-10 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                Password
                            </label>

                            <div
                                className=' text-gray-300 absolute mt-0.5 w-14 flex items-center justify-center cursor-pointer right-2 top-2'
                                onMouseDown={(e) => e.preventDefault()}
                                id='passwordEye'
                                onClick={() => {setshowPassword(!showPassword);document.getElementById('userPassword').focus()}}
                                style={{ 
                                    zIndex: '5'
                                }}
                            >
                                {showPassword ? (
                                    <svg  class="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                    </svg>
                                ) : (
                                    <svg  class="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                    
                                )}
                            </div>
                        </div>                     
                        
                        <Button
                        type="submit"
                        disabled = {!(passwordCheck&&emailCheck)}
                        className="w-full flex justify-center mt-6 duration-200 font-semibold text-lg disabled:bg-green-400"
                        >
                        {
                            loader?
                            <svg aria-hidden="true" class="inline w-7 h-7   text-transparent animate-spin fill-white " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            :
                            "Log in"
                        }      
                        </Button>                                 
                    </form>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Login