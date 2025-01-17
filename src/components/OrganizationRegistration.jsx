import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { Link ,useNavigate} from 'react-router-dom'
import Input from './Input';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"

import Button from './Button';
import authService from '../appwrite/auth';


function OrganizationRegistration() {
    const {register, handleSubmit,  setError, formState: { errors }} = useForm()
    const [organzationdetails, setorganzationdetails] = useState(true);
    const [documents, setdocuments] = useState(false);
    const [account, setaccount] = useState(false);
    const [loader, setloader] = useState(false);
    const navigate = useNavigate()
    const [password, setpassword] = useState("");
    const [submitted, setsubmitted] = useState(false);
    const [prompt, setprompt] = useState(false);
    const [adharcardImage, setadharcardImage] = useState(null);
    const [pancardImage, setpancardImage] = useState(null);
    const [electricitybillImage, setelectricitybillImage] = useState(null);
    const [ownershipImage, setownershipImage] = useState(null);
    const [registrationrcertificateImage, setregistrationrcertificateImage] = useState(null);
    const [gstcertificateImage, setgstcertificateImage] = useState(null);
    const [cincertificateImage, setcincertificateImage] = useState(null);
    const [appointineCertificeteImage, setappointineCertificeteImage] = useState(null);

    const [formState, setFormState] = useState(() => {
    const storedState = JSON.parse(localStorage.getItem('formState')) || {
        organzationdetails: true,
        documents: false,
        account : false,
        organzationdetailsData: {},
        documentData : {},
        accountData : {}
    };
    return storedState;
    });

    const [organzationdetailsData, setorganzationdetailsData] = useState(formState.organzationdetailsData);
    const [documetsData, setdocumetsData] = useState(formState.documentData);
    const [accountData, setaccountData] = useState(formState.accountData);

    const setOrganizationData = async (data)=>{
        setorganzationdetailsData(data)
        console.log(data);
        const newFormState = {
            ...formState,
            organzationdetailsData: data,
            documents: true,
            organzationdetails: false,
            account : false
          };

          // Update form state and store it in localStorage
          setFormState(newFormState);
          localStorage.setItem('formState', JSON.stringify(newFormState));
    }
    const setDocumentData = async (data) => {
        console.log(data);
        const newFormState = {
            ...formState,
            documentData: data,
            documents: false,
            organzationdetails: false,
            account: true
        };
    
        setFormState(newFormState);
        localStorage.setItem('formState', JSON.stringify(newFormState));
    }

    const createOrganization = async(data)=>{
        console.log("createin");
        const userData = {
            "organizationName": organzationdetailsData.name,
            "organizationEmail": organzationdetailsData.email,
            "organizationContact": organzationdetailsData.contact,
            // Add other organization details as needed
            "organizationPassword": password, // Assuming password is stored in component state
            "organizationAddress": organzationdetailsData.address,
            "organizationLocation": organzationdetailsData.address,
            "organizationRole": "ADMIN"
        };
        setloader(true)
        setsubmitted(true)
        try {
            await authService.createOrganization(userData).then((res)=>{
                console.log("created sucessfully");
                setloader(false)
                setprompt(true)
                setTimeout(() => {
                    navigate("/organization/login")
                }, 5000);
            })
        } catch (error) {
            setloader(false)

        }
       
      
    }
    const updateLocalStorageOnChange = (key, newValue) => {
        const updatedFormState = {
          ...formState,
          [key]: newValue,
        };
      
        // Update form state and store it in localStorage
        setFormState(updatedFormState);
        localStorage.setItem('formState', JSON.stringify(updatedFormState));
      
        console.log('Local Storage Updated:', updatedFormState);
    };
    const handleInputChange = (key, value) => {
        setOrganizationData({
          ...organzationdetailsData,
          [key]: value,
        });
        updateLocalStorageOnChange(key, value);
      };
    useEffect(() => {
        // Update localStorage whenever form state changes
        localStorage.setItem('formState', JSON.stringify(formState));
        return()=>{
            localStorage.removeItem('formState');
        }
      }, [formState]);

  return (
    <div className=' text-gray-800 flex justify-center  overflow-hidden  duration-200' >
        <div class="fixed top-0 left-0 w-full bg-white p-4 flex justify-between items-center px-10 font-sans text-xl">
            <div className='font-semibold '></div>
            <div className='flex flex-row gap-9  text-lg font-semibold items-center'>
                <Link to={"/organization/login"} state={{label : "organization"}} className='cursor-pointer'>Login</Link>
            </div>
        </div>
        <div className='mt-16 max-w-screen-lg min-w-max'>
            <div className='border border-gray-300'>
                <ol class=" flex items-center border-b space-x-4 text-xl font-medium text-center text-gray-500 p-5">
                    <li onClick={()=>{!submitted?(setFormState({...formState, documents: false,organzationdetails: true,account : false})):null}} id={submitted?'disabled-input':null} className={`flex items-center cursor-pointer ${formState.organzationdetails?'text-blue-600':null} ${submitted?'disabled':null}`}>
                    <span class="flex items-center justify-center w-8 h-8 me-2 text-lg border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                            1
                        </span>
                        Organization Details
                        <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                        </svg>
                    </li>
                    <li onClick={()=>{!submitted?(setFormState({...formState, documents: true,organzationdetails: false,account:false})):null}} id={submitted?'disabled-input':null} className={`flex items-center cursor-pointer ${formState.documents?'text-blue-600':null} ${submitted?'disabled':null}`}>
                    <span class="flex items-center justify-center w-8 h-8 me-2 text-lg border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                            2
                        </span>
                        Documents <span class="hidden sm:inline-flex sm:ms-2">Info</span>
                        <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                        </svg>
                    </li>
                    <li onClick={()=>{!submitted?(setFormState({...formState, documents: false,organzationdetails: false,account : true})):null}} className={`flex items-center cursor-pointer ${formState.account?'text-blue-600':null} ${submitted?'disabled':null}`}>
                        <span class="flex items-center justify-center w-8 h-8 me-2 text-lg border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                            3
                        </span>
                        Account 
                    </li>
                </ol>


            <form action='' onSubmit={handleSubmit(setOrganizationData)} className={`${formState.organzationdetails?'visible':'hidden' }`} >
                {/* Company Information */}
                <div id='organization' className='flex  p-5 py-6 flex-col gap-4'>
                    <div className='flex flex-row gap-5'>
                        <div className='w-full flex flex-col gap-4'>
                            <Input
                            
                                label="Organization name"
                                placeholder="Enter your organization's legal name"
                                type="text"
                                id = "organizationName"
                                value={organzationdetailsData?.name}
                                onChange={(value) => handleInputChange('name', value)}
                                {...register("name", {
                                    required: true,
                                })}
                            />
                             {/* <div className='w-full '>
                                    <label 
                                    className='inline-block mb-1 pl-1 font-semibold' 
                                    >
                                        Name
                                    </label>
                                    
                                    <input
                                    type={"text"}
                                    value={organzationdetailsData.name}
                                    className={`px-3 py-2 rounded-sm placeholder-gray-400 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  w-full `}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                   
                                    />
                                </div> */}
                            <Input
                                label="Email "
                                id= "organzationEmail"
                                value = {organzationdetailsData?.email}
                                placeholder="Enter your email address"
                                type="email"
                                onChange={(value) => handleInputChange('name', value)}

                                {...register("email", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className='flex flex-col gap-4 w-full'>
                        <Input
                            label="Adharcard number"
                            value = {organzationdetailsData?.adharcard}
                            placeholder="Enter company's adhar number"
                            type="number"
                            onChange={(value) => handleInputChange('name', value)}

                            {...register("adharcard", {
                                required: true,
                            })}
                        />

                        {/* Services Offered */}
                        <Input
                            label="GST number"
                            placeholder="Enter company's pancard number"
                            type="text"
                            onChange={(value) => handleInputChange('name', value)}

                            value = {organzationdetailsData?.gstnumber}

                            {...register("gstnumber", {
                                required: true,
                                pattern : {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: "This is not a valid GST number",
          
                                },
                                // maxLength: {
                                //     value: 10,
                                //     message: "Enter 10 digit GST number",
                                // },
                                minLength: {
                                    value: 10,
                                    message: "Enter 10 digit GST number",
                                  },
                                // validate: {
                                //     matchPatern: (value) => /^[a-zA-Z0-9]+$/.test(value),
                                //     message : 'GST number is not valid',
                                    
                                // }
                            })
                            }
                           
                           
                        />
                        {
                            errors && <div className='-mt-3 -mb-1 text-sm'><ErrorMessage errors={errors}   name="gstnumber" render={({message})=>message!==undefined? <p className="text-red-500">{message}</p> : null} /></div>

                        }
                        {/* <ErrorMessage errors={errors} name="g" render={({ message }) => <p className="text-red-500">{message}</p>} /> */}

                         {/* {errors.gstnumber && (<p className="text-red-500">{errors.gstnumber.message}</p> */}
                    
                    </div>
                        <div className='w-full '>
                            <label
                                for="businessaddress"
                                className="inline-block mb-1 pl-1 font-semibold text-gray-800"
                                >Business address</label > 

                            <textarea
                                className="px-3 py-2 h-32 rounded-sm placeholder-gray-400 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  w-full"
                                id="organizationAddress"
                                typeof='address'

                                value = {organzationdetailsData?.address}
                                onChange={(value) => handleInputChange('name', value)}

                                {...register("businessaddress", {
                                    required: true,
                                })}
                                rows="3"
                                placeholder="Enter registered business address"></textarea>
                        </div>
                        
                        
                    </div>
                    
                    {/* Registration and Certification */}
                    <div className='flex flex-row gap-5'>
                        <Input
                        id = "organizationContact"
                            label="Contact info "
                            placeholder="Enter company's registered phone number"
                            className="flex-1"
                            value = {organzationdetailsData?.contact}
                            onChange={(value) => handleInputChange('name', value)}

                            type="number"
                            {...register("contact", {
                                required: true,
                            })}
                        />
                        <Input
                            label="OTP "
                            placeholder="Enter your email address"
                            type="number"
                            
                            value = {organzationdetailsData?.otp}
                            onChange={(value) => handleInputChange('name', value)}


                            {...register("otp", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Registration number"
                            placeholder="Enter registration number"
                            type="text"
                            value = {organzationdetailsData?.registrationnumber}
                            onChange={(value) => handleInputChange('name', value)}

                            {...register("registrationnumber", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^[a-zA-Z0-9]+$/.test(value) ||
                                    "GST number is not valid",
                                }
                            })}
                        />
                    </div>
                    

                    <div className='flex gap-5'>
                        
                        <Input
                            label="Corporation Identification Number"
                            placeholder="Enter CIN number"
                            type="text"
                            value = {organzationdetailsData?.cinnumber}
                            onChange={(value) => handleInputChange('name', value)}

                            {...register("cinnumber", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^[a-zA-Z0-9]+$/.test(value) ||
                                    "GST number is not valid",
                                }
                            })}
                        />

                        <Input
                        label="Website URL (optional)"
                        placeholder="Enter website URL eg. example.com"
                        type="text"
                        value = {organzationdetailsData?.websiteurl}
                        onChange={(value) => handleInputChange('name', value)}

                        {...register("websiteurl", {
                            required: true,
                            // validate: {
                            //     matchPatern: (value) => /^[a-zA-Z0-9]+$/.test(value) ||
                            //     "GST number is not valid",
                            // }
                        })}
                    />
                    <div  className='flex items-end ml-4 cursor-pointer'>
                        <Button  type='submit' className='h-11 w-20 text-green-600 text-xl flex items-center justify-center font-semibold '>Next</Button>
                    </div>

                    </div>
                </div>
            </form>
            <form action="" onSubmit={handleSubmit(setDocumentData) } className={`${formState.documents?'visible':'hidden'}`}>
                <div className='p-5 flex flex-col gap-3 overflow-auto max-h-80' >
                    <div className='flex flex-row justify-between h-10 space-x-40 items-center'>
                        <div className='flex gap-1'><p className='font-semibold'>Aadhar card of the authorized person</p><p className='text-red-600 text-xl -mt-1'>*</p></div>
                        <div className='flex flex-row gap items-center gap-4'>
                            <p>{organzationdetailsData?.adharnumber}</p>
                            <input
                                onChange={(e)=>{setadharcardImage(e.target.files[0])}}
                            type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                        </div>
                    </div>
                    <div className='flex flex-row justify-between h-10 space-x-40 items-center'>
                    <div className='flex gap-1'><p className='font-semibold'>PAN copy of the authorized person</p><p className='text-red-600 text-xl -mt-1'>*</p></div>
                        <div className='flex flex-row gap items-center gap-4'>
                            {/* <p>{organzationdetailsData.adharnumber}</p> */}
                            <input
                                onChange={(e)=>{setpancardImage(e.target.files[0])}}
                                type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                        </div>
                    </div>
                    <div className='flex flex-row justify-between h-10 space-x-40 items-center'>
                    <div className='flex gap-1'><p className='font-semibold'>GST certificate of applicant organization</p><p className='text-red-600 text-xl -mt-1'>*</p></div>

                        <div className='flex flex-row gap items-center gap-4'>
                            <p>{organzationdetailsData?.gstnumber}</p>
                            <input
                                onChange={(e)=>{setgstcertificateImage(e.target.files[0])}}
                            type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                        </div>
                    </div>
                    <div className='flex flex-row justify-between h-10 space-x-40 items-center'>
                    <div className='flex gap-1'><p className='font-semibold'>Rent/lease/ proof of ownership</p><p className='text-red-600 text-xl -mt-1'>*</p></div>
                        <div className='flex flex-row gap items-center gap-4'>
                            {/* <p>{organzationdetailsData.adharnumber}</p> */}
                            <input
                                 onChange={(e)=>{setownershipImage(e.target.files[0])}}

                            type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                        </div>
                    </div>
                    <div className='flex flex-row justify-between h-10 space-x-40 items-center'>
                    <div className='flex gap-1'><p className='font-semibold'>CIN(certificate of incorporation) in case of company/LLP</p><p className='text-red-600 text-xl -mt-1'>*</p></div>
                        <div className='flex flex-row gap items-center gap-4'>
                            <p>{organzationdetailsData?.cinnumber}</p>
                            <input
                               onChange={(e)=>{setcincertificateImage(e.target.files[0])}}
                            type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                        </div>
                    </div>
                    <div className='flex flex-row justify-between h-10 space-x-40 items-center'>
                    <div className='flex gap-1'><p className='font-semibold'>Electricity bill of the Unit Location</p><p className='text-red-600 text-xl -mt-1'>*</p></div>

                        <div className='flex flex-row gap items-center gap-4'>
                            {/* <p>{organzationdetailsData.adharnumber}</p> */}
                            <input
                                onChange={(e)=>{setelectricitybillImage(e.target.files[0])}}
                            type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                        </div>
                    </div>
                    <div className='flex flex-row justify-between h-10 space-x-40 items-center'>
                    <div className='flex gap-1'><p className='font-semibold'>Board resolution for appointing an authorized person</p><p className='text-red-600 text-xl -mt-1'>*</p></div>
                        <div className='flex flex-row gap items-center gap-4'>
                            {/* <p>{organzationdetailsData.adharnumber}</p> */}
                            <input
                              onChange={(e)=>{setappointineCertificeteImage(e.target.files[0])}}
                            type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                        </div>
                    </div>
                    <div className='flex flex-row justify-between h-10 space-x-40 items-center'>
                    <div className='flex gap-1'><p className='font-semibold'>Registration certificate</p><p className='text-red-600 text-xl -mt-1'>*</p></div>

                        <div className='flex flex-row gap items-center gap-4'>
                            <p>{organzationdetailsData?.registrationnumber}</p>
                            <input
                                {...register("registrationrcertificateImage", {
                                required: false,
                                
                            })} 
                            type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                        </div>
                    </div>
                    
                </div>
                <div  className='flex flex-col items-end mr-4 mt-2 mb-2 cursor-pointer '>
                    <Button  type='submit' textColor='text-green-600' className='h-11 w-20  bg-white text-xl flex items-center justify-center font-semibold '>Next</Button>
                </div>
            </form>

            <form action="" onSubmit={handleSubmit(createOrganization)} className={`${formState.account?'visible':'hidden'} `}>

                <div className='p-5 flex flex-col gap-3 overflow-auto max-w-screen-sm max-h-50' >
                    <Input
                        label="Organization name"
                        type="text"
                        className="disabled"
                        id="disabled-input"
                        value = {organzationdetailsData?.name}
                    />
                    <div className='flex gap-4'>
                        <Input
                            label="Organization Email"
                            type="text"
                            className="disabled"
                            id="disabled-input"
                            value = {organzationdetailsData?.email}
                        />
                        <Input
                            label="Organization Contact Info"
                            type="text"
                            className="disabled"
                            id="disabled-input"
                            value = {organzationdetailsData?.contact}
                        />

                    </div>
                    
                    <div className='flex gap-4 '>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="password" className='font-semibold ml-1'>Password</label>
                            <input
                                    label="Password"
                                    className="mt-1 px-3 py-2 rounded-sm placeholder-gray-400 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  w-full "
                                    type="password"
                                    id={submitted?'disabled-input':"password"}
                                    placeholder="Choose a password"
                                    onChange={(e)=>{setpassword(e.target.value)}}
                                    // {...register("password", {
                                    //     required: true,
                                        
                                    // })} 
                                    // onChange={(value)=>{handleInputChange('password',value)}}
                                
                                />
                        </div>
                        
                        <div
                          className='flex w-full  items-end  cursor-pointer '>
                            {
                                <Button   type='submit' disabled={submitted}
                           
                                        className=' flex items-center justify-center font-semibold w-full h-11 disabled:bg-green-400'>
                                        {
                                            loader?
                                            <svg aria-hidden="true" class="inline w-8 h-8  text-transparent animate-spin  fill-white " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            :
                                            "Register"
                                        }            
                                </Button>
                            }
                        </div>
                    </div>
                </div>
                <div className={`duration-200  flex justify-center w-full max-w-2xl px-4   pb-4 ${prompt?'visible' :'hidden'}`}>
                    <p className='rounded-md text-green-800 p-4 bg-green-100 '>Your e-waste center listing request is received. Verification takes 2-3 days. After approval, you'll be notified to log in, you'll be redirected to home page shortly. Thank you</p>
                 </div>
                
                
            </form>
            {/* <form action="" className='disabled'>
                <input type="text" className='disabled:' />
                <input type="text" className='disabled:' name="" id="" />
                <button type='submit'> submit</button>
            </form> */}
           
        </div>
            
        </div>
    </div>
  )
}

export default OrganizationRegistration