import React, {useEffect,useRef, useState} from 'react'
import authService from '../appwrite/auth'
import Button from './Button'
import Otp from './Otp'
import verifiedIcon from "../assets/verified.png"
import { Link,useNavigate } from 'react-router-dom';
import AddressAutocomplete from './UserAddress'
import UserAddress from './UserAddress'
import LocationSearchInput from './UserAddress'


function Signup() {

  const [otpInput, setotpInput] = useState(false);
  const fileInputRef = useRef(null);
  const [email, setemail] = useState("");
  const [emailChecking, setemailChecking] = useState(false);
  const [otpValue, setotpValue] = useState("");
  const [verified, setverified] = useState(false);
  const [next, setNext] = useState(false)
  const [loader, setloader] = useState(false);
  const [usernameChecking, setusernameChecking] = useState(false);
  const [usernameChecked, setusernameChecked] = useState(false);
  const [userNameAvailable, setuserNameAvailable] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  
  const handleIconClick = () => {
    // Trigger click event on the file input element
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the file upload logic here
    console.log('File uploaded:', file.name);
  };


  useEffect(() => {
    const locationIcon = document.getElementById("locationIcon");
    if (locationIcon) {
      locationIcon.addEventListener('click', () => {
        document.getElementById("userAddress").value = "Kandivali West,Mumbai India";
      });
    }
  }, []);

  const verifyUserName = (username) =>{
  
  }
  const verifyEmail = () => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var emailInput = document.getElementById("userEmail");
    var emailBorder = document.getElementById("userEmailFull")
    if (emailInput.value.match(validRegex)) {
      setemailChecking(true)

      emailBorder.focus();
      emailBorder.classList.remove("border-red-400","bg-red-50"); 
      authService.checkEmailAvailability(emailInput.value)
        .then((data) => {
          document.getElementById("error").classList.add("invisible")
          console.log("otp : ",data);
          setotpValue(data)
          setemail(emailInput.value)
          setotpInput(true);
        })
        .catch((error) => {
          document.getElementById("error").classList.remove("invisible")
          document.getElementById("error").innerText = error
          console.error('Error checking email:', error);
        })
        .finally(()=>{
          setemailChecking(false)

        }
        )
        
    } else {
      emailBorder.classList.add("border-red-400","bg-red-50"); 
    }
  };
  const create = async (e) => {
    e.preventDefault();
    console.log("submit");
    setloader(true);

   // Define the user data
const userData = {
    username: document.getElementById("userName").value,
    userEmail: document.getElementById("userEmail").value,
    userContact: document.getElementById("userContact").value,
    userAadhaarCard: document.getElementById("userAdhar").files[0],
    userPassword : document.getElementById("userPassword").value,
    userBirthDate: document.getElementById("userBirthDate").value,
    userAddress: document.getElementById("userAddress").value,
    userLocation: document.getElementById("userAddress").value,
    userReward: 0,
    userRole: "USER"
};

// Call the signup function with the user data
try {
    const response = await authService.signup(userData,document.getElementById("userAdhar").files[0]);
    console.log('Signup successful:', response);
    // Redirect to the login page or perform any other necessary actions
    window.location.href = '/user/login';
} catch (error) {
    console.error('Signup failed:', error);
    // Handle signup failure (e.g., display error message to the user)
}
finally {
  setloader(false);
}
};


  return (
    <div className='flex flex-col  h-full  items-center text-gray-800'>
       <div class="  w-full  p-4 flex justify-between items-center px-10 font-sans text-xl">
                <div className='font-semibold '></div>
                <div className='flex flex-row gap-9  text-lg font-semibold items-center'>
                    {
                        <Link to={"/user/login"} className='cursor-pointer'>Login</Link>
                    }
                </div>
            </div>
      <div id='email-form' className={`border max-w-sm p-10 mt-14   ${next?'hidden':null}`} >
      
        <div className=''>
          <p className='text-2xl font-semibold text-gray-800 '>Hello User</p>
          <p className='text-sm text-gray-400'>Enter you email address to get started</p>
        </div>
        <p id='error' className='text-red-500 px-2 mt-1 w-fit rounded-sm text-sm bg-red-50 invisible'>
          error
        </p>
        <div className={`flex flex-col w-72 mt-8 ${otpInput?'hidden':null}`}>
         
          <div id='userEmailFull' class="relative flex peer mt-5 items-center">
            <input 
                type="email" 
                id="userEmail" 

                title='Email address'
                class="flex-1 block px-3 py-3 font-normal bg-white rounded-sm border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                style={{ 
                  "-webkit-autofill": "number",
                  "-webkit-box-shadow": "0 0 0px 1000px white inset", 
              }}  
               
            />
            <label 
                for="userEmail" 
                class="absolute duration-200 cursor-text px-2 text-gray-400 bg-white font-normal transform -translate-y-5 scale-90 top-2 z-10 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
                Email address
            </label>

            <div
                className=' text-gray-300 absolute w-14 flex items-center justify-center border-l h-9 cursor-pointer my-1  right-2 pl-1.5 '
              
            >
              
              {
              !emailChecking?
                verified?
                <img src={verifiedIcon} className='h-8 w-8' alt="" />
                :
                <p className='text-blue-500 cursor-pointer font-medium flex items-center my-1   ' onClick={(e)=>{verifyEmail()}}>verify</p>
                :
                <svg aria-hidden="true" class=" inline  w-6 h-6  self-center text-transparent animate-spin  fill-blue-500 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            }
          </div>
        </div>   
        </div>
        {/* <div className=' flex'>
          <div class="relative flex peer">
                <input type="email" id="email_input" class="text-lg block px-2.5 pb-2 pt-2 w-full font-normal   bg-white rounded-sm  border appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="email_input" class="absolute duration-200 cursor-text text-lg px-2 text-gray-400 bg-white  font-normal transform -translate-y-6 scale-90 top-2 z-10   peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email address</label>
          </div>
          <div className='flex items-center ml-4'>
          <svg class="h-8 w-8 text-gray-800 hover:text-blue-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" /></svg>
          </div>
        </div> */}
        <Otp verified={verified} setVerified={setverified} genertedOtp={otpValue} setOtpInput={setotpInput} text={email} className={`mt-8 ${!otpInput?'hidden':null}`}/>
        <Button
          type="button"
          // disabled = {!(passwordCheck&&emailCheck)}
          onClick={()=>{setNext(true)}} 
          disabled = {!verified}
          className="w-full flex justify-center mt-6 duration-200 font-semibold text-lg disabled:bg-green-400"
          >
          {
              loader?
              <svg aria-hidden="true" class="inline w-7 h-7   text-transparent animate-spin fill-white " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              :
              "Next"
          }      
          </Button>           
        {/* <Button className='w-full mt-5 font-medium disabled:bg-green-300' onClick={()=>{setNext(true)}} disabled = {!verified}>Next</Button> */}
      </div>
    
        <form action="" method="post" onSubmit={(e)=>{create(e)}}  className={`border p-10 justify-center  ${next?null:'hidden'} `}>
          <div className=''>
            <p className='text-2xl font-semibold text-gray-800 '>Let's setup your account</p>
            <p className='text-sm text-gray-400'>Enter your details to create your account</p>
          </div>
          <p id='errorAccount' className='text-red-500 px-2 mt-1 w-fit rounded-sm text-sm bg-red-50 hidden'>
            error
          </p>
          <div className='flex gap-5 w-full mt-10'>
            <div className='flex flex-col '>
              <label htmlFor="userName" className='font-medium ml-1'>Username</label>
              <div id='usernameFull' className='flex  row border rounded-sm '>
                <input 
                    type="text" 
                    id="userName" 
                    onChange={(e)=>{verifyUserName(e.target.value)}}
                    className="bg-white px-3 py-2 rounded-sm focus:bg-gray-50 duration-200 placeholder:text-gray-400 outline-none no-spin-buttons" 
                    style={{ 
                        "-webkit-autofill": "number",
                        "-webkit-box-shadow": "0 0 0px 1000px white inset", 
                    }}  
                    placeholder="Enter your fullname"
                    // pattern="[a-zA-Z0-9_]+"
                   
                    title="Username can only contain letters, numbers, and underscores"
                />
                <div className='flex  bg-transparent px-2 my-1 items-center justify-center w-14   '>
                  {
                  usernameChecking||usernameChecked?
                    usernameChecked?
                        userNameAvailable?
                        <svg class="h-8 w-8 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        :
                        <svg class="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>

                      :
                      <svg aria-hidden="true" class="inline w-6 h-6  text-transparent animate-spin  fill-blue-500 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                  :
                  null            
                  
                  }   
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full'>
                <label htmlFor="userPassword" className='font-medium ml-1'>Password</label>
                <div id='userpasswordFull' className='flex  row border rounded-sm'>
                  <input
                    type={showPassword ? "text" : "password"} // Dynamically set the type attribute
                    id='userPassword'
                    className='bg-white px-3 py-2 rounded-sm duration-200 placeholder:text-gray-400 outline-none no-spin-buttons'
                    placeholder='Create a password'
                  />
                  <div
                    className='flex cursor-pointer px-2 my-1 items-center justify-center w-14 border-l'
                    onClick={() => setshowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        class='h-6 w-6 text-gray-800'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    ) : (
                      <svg
                        class='h-6 w-6 text-gray-800'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
          </div>
          {/* <div className='flex flex-col mt-10'>
            <label htmlFor="username" className='font-medium ml-1'>Username</label>
            <input type="text" id='userName' className=' border bg-white  px-3 py-2 rounded-sm focus:bg-gray-50 duration-200 placeholder:text-gray-400  outline-none no-spin-buttons flex-1' 
              style={{ 
                "-webkit-autofill": "text",
                "-webkit-box-shadow": "0 0 0px 1000px white inset", 
              }}  
              placeholder='Choose a username' />
          </div> */}
          <div className='flex flex-row gap-5  mt-2 w-full'>
            <div >
              <div className='flex flex-col mt-3 w-full'>
                <label htmlFor="userAdhar" className='font-medium ml-1'>Adharcard</label>
                <div id='userAdharFull' className='flex  row border rounded-sm '>
                  <input type="file" id='userAdhar' className=' bg-white max-w-52 px-2 py-[5px] rounded-sm  duration-200 placeholder:text-gray-400  outline-none no-spin-buttons ' 
                    style={{ 
                      // "-webkit-autofill": "number",
                      // "-webkit-box-shadow": "0 0 0px 1000px white inset", 
                    }}  
                    placeholder='Enter adharcard number' />
                  
                  {/* <div id='adharIcon'  className='flex  px-2 my-1 items-center justify-center w-14  border-l'>
                    <svg class="h-6 w-6 text-gray-800 cursor-pointer"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <circle cx="8.5" cy="8.5" r="1.5" />  <polyline points="21 15 16 10 5 21" /></svg>
                  </div> */}
                </div>
              </div>
              <div className='flex flex-col mt-5'>
                <label htmlFor="userAddress" className='font-medium ml-1'>Address</label>
                <div id='userAddressFull' className='flex  row border rounded-sm '>
                  <input type="text" id='userAddress' className=' bg-white  px-3 py-2 rounded-sm  duration-200 placeholder:text-gray-400  outline-none no-spin-buttons ' 
                    style={{ 
                      // "-webkit-autofill": "number",
                      // "-webkit-box-shadow": "0 0 0px 1000px white inset", 
                    }}  
                    placeholder='Enter your address' />
                  <div id='locationIcon' className='cursor-pointer flex px-2 my-1 items-center justify-center w-14  border-l'>
                    <svg class="h-6 w-6 text-gray-800"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>                  
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full '>
              <div className='flex flex-col mt-3 w-full'>
                  <label htmlFor="userContact" className='font-medium ml-1'>Contact</label>
                  <input type="number" id='userContact' className=' border bg-white  px-3 py-2 rounded-sm focus:bg-gray-50 duration-200 placeholder:text-gray-400  outline-none no-spin-buttons flex-1' 
                    style={{ 
                      "-webkit-autofill": "number",
                      "-webkit-box-shadow": "0 0 0px 1000px white inset", 
                    }}  
                    placeholder='Enter your contact number' />
              </div>
              <div className='flex flex-col mt-5 w-full'>
                  <label htmlFor="userBirthDate" className='font-medium ml-1'>Birthdate</label>
                  <input type="date" id='userBirthDate' className=' border bg-white  px-3 py-[7px] rounded-sm focus:bg-gray-50 duration-200 placeholder:text-gray-400  outline-none no-spin-buttons flex-1' 
                    placeholder='Enter your contact number' />
              </div>
            </div>
            
          </div>

          
          <Button
          type="submit"
          className="w-full mt-6  flex items-center justify-center font-semibold text-lg"
          >
          {
              loader?
              <svg aria-hidden="true" class="inline w-7 h-7    text-transparent animate-spin fill-white " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              :
              "Create"
          }      
          </Button>      
        </form>
    </div>
  )
}

export default Signup