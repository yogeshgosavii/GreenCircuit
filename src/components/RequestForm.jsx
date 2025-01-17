import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux"
import { useForm } from 'react-hook-form'
import Input from './Input'
import { useLocation } from "react-router-dom";
import Button from './Button'
import service from '../appwrite/config'
import {useSelector} from 'react-redux'
import authService from '../appwrite/auth'
import PlaceCard from './PlaceCard'


function RequestForm() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [organizations, setOrganizations] = useState([]);
    const [loader, setloader] = useState(false);


    const [useraddress, setuseraddress] = useState("userData.useraddress");
    const [adharcardImage, setadharcardImage] = useState(null);
    const userData = authService.getCurrentUser();

    console.log(userData);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setadharcardImage(file);
      };
    
    const createRequest = async(data)=>{
        console.log(adharcardImage);
        setloader(true)
        try {
            service.createRequest(
                {
                    "requestDescription": data.requestDescription,
                    "requestType": data.requestType,
                    "quantity": data.requestQuantity,
                    "requestStatus": "Applied",
                    "requestDate": new Date(),
                    "user" : await userData,
                    "organization" : organizations.find(org => org.organizationId === data.organizationId)
                  }
            ).then((res)=>{
                console.log(res);
                navigate("/requests")
                
            })
        } catch (error) {
            console.log(error);
        }
        finally{
            setloader(false)
        }
       
    }
    useEffect(() => {
        service.getOrganizations().then((list)=>{
          if(list){
            setOrganizations(list);
            console.log(organizations);
          }
        })
       
      }, []);
  return (
    <div  className=' flex justify-center h-full items-center'>
            {/* <div className='flex flex-col  px-12 py-5 max-w-96 justify-between'>
                <div className='cursor-pointer  mt-5'>
                    <p className='font-semibold text-2xl'>Steps to follow</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-center mt-2'>If your phone is old rather than throwing it away for nothing give it to us and get amazing rewards !</p>
                    
                </div>
                <div className='flex flex-col gap-8 mt-10 text-xl w-full'>
                    <div className='flex '>
                        <p className='  font-semibold mr-4 '>Step 1</p><p className='flex-1 text-gray-500'>Create a request</p>
                    </div>
                    <div className='flex'>
                        <div className='font-semibold mr-4'> Step 2</div> <p className='flex-1 text-gray-500'>Wait for admin approvel</p>
                    </div>
                    <div className='flex'>
                        <p className='font-semibold mr-4'> Step 3</p> <p className='flex-1 text-gray-500'>Submit the device </p>
                    </div>
                    <div className='flex'>
                        <p className='font-semibold mr-4'> Step 4</p> <p className='flex-1 text-gray-500'>Win the best reward </p>
                    </div>
                </div>
               
            </div> */}
            <div className= 'min-w-fit w-12 pl-14    '>
                <h2 className="text-xl font-semibold leading-tight">Request registration</h2>
                <p className='text-gray-400 text-sm mt-1'>Enter your valid details carefully for request registration</p>
                {error && <p className="text-red-600  text-center">{error}</p>}
                <form onSubmit={handleSubmit(createRequest)} className='mt-8'>
                    <div className='font-medium flex flex-col text-sm gap-3'>
                       <div className='flex flex-row gap-4'>
                        <div className=' flex flex-col  justify-between w-full  items-start'>
                                    <label htmlFor='accounttype' className='font-semibold ml-1 w-full'>Device type</label>
                                    <select name="Accounttype"
                                        onChange={(e)=>{
                                        setType(e.target.value)
                                        console.log(type);
                                        }}
                                        {...register("requestType", {
                                            required: false,
                                            
                                        })}  
                                         id="accounttype" className='border border-gray-200 p-2 pr font-normal w-full rounded-sm mt-1'>
                                        <option value="tv">Television</option>
                                        <option value="Computer">Computer</option>
                                        <option value="Laptop">Laptop</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Other">Other</option>


                                        {/* <option value="Shop">Applied requests</option> */}
                                    </select>
                                   
                                </div>
                                <Input
                                        label="Quantity"
                                        placeholder="Enter number of items"
                                        type="number"
                                        {...register("requestQuantity", {
                                            required: true,
                                        })}
                                        />
                                         <Input
                            label="Device Description"
                            placeholder="Short description of device"
                            {...register("requestDescription", {
                                required: true,
                            })}
                            />
                                </div>
                       
                         <div className='flex flex-row gap-3 '>
                            <div className='flex flex-col gap-7 w-full'>
                           
                                <Input
                                label="Adharcard no."
                                placeholder="Enter adhar number"
                                {...register("adharcard", {
                                    required: true,
                                })}
                                />
                                {/* <div className=' flex flex-col  justify-between w-full  items-start'>
                                        <label htmlFor='timeslot' className='font-semibold ml-1 w-full'>Time slot</label>
                                        <select name="Timeslot"
                                            onChange={(e)=>{
                                            setType(e.target.value)
                                            console.log(type);
                                            }}
                                            {...register("timeslot", {
                                                required: true,
                                                
                                            })}  
                                            id="accounttype" className='border border-gray-200 p-2 pr font-normal w-full rounded-sm mt-1'>
                                            <option value="10am-11am">10am-11am</option>
                                            <option value="1pm-4pm">1pm-4pm</option>
                                            <option value="4pm-6pm">4pm-6pm</option>
                                        


                                        </select>
                                    
                                    </div> */}
                                    <div className=' w-full  items-end'>
                                    <label
                                    for="address"
                                    className="inline-block mb-1 pl-1 font-semibold text-gray-800"
                                    >E-waste center</label > 
                                    <select name="Company"
                                    
                                            
                                                {...register("organizationId", {
                                                    required: true,
                                                    
                                                })}  
                                                id="accounttype" className='border border-gray-200 p-2  font-normal w-full rounded-sm '>

                                                {
                                                    
                                                    organizations.map((organization)=>{
                                                        console.log(organization);
                                                        return(
                                                             <option value={organization.$id}>{organization.organizationName}</option>

                                                        )

                                                        
                                                    })
                                                }
                                               


                                        </select>
                                       
                                   
                                </div>
                            </div>
                           
                             <div className='w-full h-full '>
                                <label
                                    for="address"
                                    className="inline-block mb-1 pl-1 font-semibold text-gray-800"
                                    >Address</label > 

                                <textarea
                                    className="px-3 py-2 h-32 rounded-sm font-normal placeholder-gray-400 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  w-full"
                                    id="address"
                                    typeof='address'
                                    onChange={(e)=>{setuseraddress(e.target.value)}}
                                    // value = {organzationdetailsData?.address}
                                    // onChange={(value) => handleInputChange('name', value)}

                                    // {...register("address", {
                                    //     required: true,
                                    // })}
                                    rows="3"
                                    placeholder="Enter registered business address"></textarea>
                            </div>
                            </div>
                            <div className='flex flex-row gap-5'>
                                {/* <div className='flex  flex-col w-full justify-between  items-center'>
                                    <div className='flex gap-1 w-full'><p className='font-semibold'>Image pdf of the item</p></div>
                                    <div className='flex flex-row gap-4  w-full font-normal'>
                                        <input
                                           onChange={handleFileChange}
                                        type="file" class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />                                
                                    </div>
                                </div> */}
                                {/* <div className=' w-full flex items-end'>
                                    <select name="Company"
                                    
                                            
                                                {...register("companyId", {
                                                    required: true,
                                                    
                                                })}  
                                                id="accounttype" className='border border-gray-200 p-2  font-normal w-full rounded-sm '>

                                                {
                                                    
                                                    organizations.map((company)=>{
                                                        console.log(company);
                                                        return(
                                                             <option value={company.$id}>{company.organizationName}</option>

                                                        )

                                                        
                                                    })
                                                }
                                               


                                        </select>
                                       
                                   
                                </div> */}
                              
                            </div>
                            
                            <Button
                            type="submit"
                            className="w-full mt-6 h-11"
                            >
                                 {
                                loader?
                                <svg aria-hidden="true" class="inline w-8 h-8  text-transparent animate-spin  fill-white " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                                :
                                "Create request"
                            }
                            </Button>
                        {/* <button className='w-full px-4 py-2 mt-3 rounded-lg border'>Sign in with google</button> */}
                        
                    </div>
                    {/* <div className='mt-6 text-center'>
                        <p>Use guide ? <button className='text-blue-700' onClick={() => navigate("/signup")}> User Guide</button></p>
                    </div> */}
                </form>
            </div>
    </div>
  )
}

export default RequestForm