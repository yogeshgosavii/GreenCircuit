import React, { useEffect, useId, useState } from 'react'
import service from '../appwrite/config';
import { useLocation ,useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import Button from './Button';
import Input from './Input';


function RequestView() {
    const [requestDetails, setRequestDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const [loader, setloader] = useState(true);
    const [userId, setUserId] = useState(location.state?.userId);
    const [requestId, setRequestId] = useState(location.state?.requestId);
    const [companyId, setcompanyId] = useState(location.state?.companyId);
    const user = useSelector((state) => state.auth.userData);
    const currentuserId = user.$id
    const [label, setlabel] = useState(currentuserId.split(".")[0]);
    const [feedback, setfeedback] = useState(null);
    const [organizationDetails, setorganizationDetails] = useState({});
    const getreward = (cat)=>{
        if("Mobile"){
            return 100
        }
        else if("Laptop"){
            return 200
        }
        else if("Computer"){
            return 400
        }
        else{
            return 2000
        }
    }
    const downloadDocuments = (requestId)=>{
        console.log(requestId+"adharcard");
        const document = service.getRequestDocument(requestId).then((res)=>{
            console.log(res);
        })
    }
    const deleteRequest = (requestId)=>{ service.deleteRequest(requestId).then((res)=>{
        if(res){
          console.log("request deleted");
          navigate("/inbox")
        }
      })
  
    }

    const updateFeedback = (feedback)=>{
        console.log(feedback);
        try {
            service.updateRequest(
                {
                    requestId: requestId,
                    userId: requestDetails.userId,
                    status: requestDetails.status,
                    catagories: requestDetails.catagories,
                    description: requestDetails.description,
                    companyId: requestDetails.companyId,
                    feedback : feedback
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    const updateStatus = (updatedStatus) => {
       try {
        service.updateRequest(
            {
                requestId: requestId,
                userId: requestDetails.userId,
                status: updatedStatus,
                catagories: requestDetails.catagories,
                description: requestDetails.description,
                companyId: requestDetails.companyId,
            }
        ).then((res)=>{
            
        })
        if(updatedStatus === "Completed"){
            console.log("user : "+userId);
            console.log(userDetails.reward+getreward(requestDetails.catagories));
            service.updatereward(
                {
                    userId : userId,
                    username : userDetails.username	,
                    userlocation : userDetails.userlocation,
                    useradhar : userDetails.useradhar,
                    email : 	userDetails.email,
                    reward : (userDetails.reward+getreward(requestDetails.catagories)),
                }
            ).then((res)=>{
                console.log(res);
            })
        }
       
       } catch (error) {
        console.log(error);
       }
       navigate("/history")
    }
    useEffect(() => {
        console.log(label);
      // Fetch request details
      const getRequestDetails = async () => {
        try {
          const res = await service.getRequestDetails(requestId);
          setfeedback(requestDetails.feedback)
          setRequestDetails(res);
          
        } catch (error) {
          console.error('Error fetching request details:', error);
        }
      };

      // Fetch user details
    
      const getUserDetails = async () => {
        try {
          const userRes = await service.getUserDetails(userId);
          if (userRes) {
            console.log(userRes);
            setUserDetails(userRes);
            setloader(false)
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      const getOrganizationDetails = async ()=>{
        try {
            const orgd = await service.getOrganizationDetails(companyId)
            console.log(companyId);
            console.log(orgd);
            if(orgd){
                setorganizationDetails(orgd)
            }
        } catch (error) {
            
        }
      }

      getOrganizationDetails();
      getRequestDetails();
      getUserDetails();
  
    }, [requestId, userId]); // Include d
       
         
  return (
    loader?
    <div>loading...</div>
    :
    (
        label === "user"?
        <div className='h-full align-middle  flex-row flex items-center justify-center'>
            <div className=' border h-fit'>
           
                <div className=' max-w-3xl'>
                    <div className=' pb-5 align-middle '>
                            <p className='text-xl font-semibold py-3 px-6 bg-gray-100'>Center Details</p>
                            <div className='text-md py-3 px-6 text-gray-500 flex gap-8'>
                                <div className=' '>
                                        <div className=''><p className='font-semibold mr-2 '>Canter name</p> <p className='truncate ... max-w-48'>{organizationDetails?.name}</p> </div>
                                      <div className='flex flex-row mt-6   gap-5'> 
                                        <div className=''><p className='font-semibold mr-2'>Contact</p>  {organizationDetails?.contact}</div>
                                        <div className=''><p className='font-semibold mr-2'>Email address</p>  {organizationDetails?.email}</div>
                                    </div>
                                    
                                </div>
                                <div className=' '><p className='font-semibold mr-2'>Center Address</p>  {organizationDetails?.businessaddress}</div>

                            </div>                        
                    </div>
                    <div className=''>
                        <p className='text-xl font-semibold py-3 px-6 bg-gray-100 border-y'>Request Details</p>
                        <div className='text-md text-gray-500 flex flex-col pb-5  px-6'>
                            <div className='flex flex-row mt-5  gap-16'> 
                                <div className=''><p className='font-semibold mr-2'>Request Id</p>  {requestDetails?.$id}</div>
                                <div className=''><p className='font-semibold mr-2'>Request status</p>  {requestDetails?.status}</div>
                                <div className=''><p className='font-semibold mr-2'>Time Slot</p>  {requestDetails?.timeslot}</div>
                                <div className=''><p className='font-semibold mr-2'>Catagory</p>  {requestDetails?.catagories}</div>

                            </div>
                            <div className='flex justify-between items-center mt-8'>
                            <div className='flex gap-16 items-end'>
                                <div className=''><p className='font-semibold mr-2'>Date</p>  {requestDetails?.startdate}</div>
                                <div className='cursor-pointer' onClick={()=>{downloadDocuments(requestId)}} >
                                <div className='flex flex-row px-5 py-2 gap-5  items-center  text-lg border' >
                                    <p>Documents</p>
                                    <svg class="h-8 w-8 text-gray-800"  width="10" height="0" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />  <polyline points="7 11 12 16 17 11" />  <line x1="12" y1="4" x2="12" y2="16" /></svg>
                                </div>
                            </div>
                            </div>
                               
                                {
                                    requestDetails.status == "Completed"?(
                                        <div className='flex items-end '>
                                            <input
                                                type="text"
                                                placeholder="Give your feedback"
                                                onChange={(e)=>{setfeedback(e.target.value)}}
                                                className={`px-3 py-2 rounded-sm placeholder-gray-400 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  w-full`}

                                            />
                                            <p className='p-3 py-2 border ml-2 rounded-lg cursor-pointer' onClick={()=>{updateFeedback(feedback)}}>Submit</p>
                                        </div>
                                    
                                ):
                                (
                                
                                    // requestDetails.status == "Approved"?(
                                    //     <div className='flex flex-row  text-lg border px-5 py-2' >
                                    //             <span onClick={()=>{updateStatus("Completed")}} className='font-semibold  text-green-500  cursor-pointer'>
                                    //                 Device Submited
                                    //             </span>
                                    //         </div>
                                        
                                    // ):
                                    // (
                                    <div className='flex flex-row px-10 py-2  text-lg border' >
                                        <span className='font-semibold  text-red-500 cursor-pointer' onClick={()=>{deleteRequest(requestId)}}>
                                            Delete
                                        </span>
                                    </div>
                                        
                                    // )
                                    
                                )
                                
                            }
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    :
    <div className='h-full align-middle  flex-row flex items-center justify-center'>
        <div className=' border h-fit'>
    
            <div className=' max-w-3xl'>
                <div className=' pb-5 align-middle '>
                        <p className='text-xl font-semibold py-3 px-6 bg-gray-100'>User Details</p>
                        <div className='text-md py-3 px-6 text-gray-500 flex gap-8'>
                            <div className=' '>
                                    <div className=''><p className='font-semibold mr-2 '>User name</p> <p className='truncate ... max-w-48'>{userDetails.username}</p> </div>
                                <div className='flex flex-row mt-6   gap-5'> 
                                    <div className=''><p className='font-semibold mr-2'>Contact</p>  {userDetails?.contact}</div>
                                    <div className=''><p className='font-semibold mr-2'>Email address</p>  {userDetails?.email}</div>
                                </div>
                                
                            </div>
                            <div className=' '><p className='font-semibold mr-2'>User address</p>  {userDetails?.useraddress}</div>

                        </div>                        
                </div>
                <div className=''>
                    <p className='text-xl font-semibold py-3 px-6 bg-gray-100 border-y'>Request Details</p>
                    <div className='text-md text-gray-500 flex flex-col pb-5  px-6'>
                        <div className='flex flex-row mt-5  gap-16'> 
                            <div className=''><p className='font-semibold mr-2'>Request Id</p>  {requestDetails?.$id}</div>
                            <div className=''><p className='font-semibold mr-2'>Request status</p>  {requestDetails?.status}</div>
                            <div className=''><p className='font-semibold mr-2'>Time Slot</p>  {requestDetails?.timeslot}</div>
                            <div className=''><p className='font-semibold mr-2'>Catagory</p>  {requestDetails?.catagories}</div>

                        </div>
                        <div className='flex justify-between items-center mt-8'>
                        <div className='flex gap-16 items-end'>
                            <div className=''><p className='font-semibold mr-2'>Date</p>  {requestDetails?.startdate}</div>
                            <div className=''onClick={()=>{downloadDocuments(requestId)}}>
                                <div className='flex flex-row px-5 py-2 gap-5  items-center  text-lg border' >
                                    <p>Documents</p>
                                    <svg class="h-8 w-8 text-gray-800"  width="10" height="0" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />  <polyline points="7 11 12 16 17 11" />  <line x1="12" y1="4" x2="12" y2="16" /></svg>
                                </div>
                            </div>
                        </div>
                        
                            {
                                requestDetails?.status == "Completed"?(
                                    <div className='flex flex-row mr-36'>
                                    <div className=''><p className='font-semibold mr-2'>Feedback</p>  <p>{requestDetails?.feedback?requestDetails.feedback:"No feedback yet"}</p></div>

                                        
                                    </div>
                                
                            ):
                            (
                            
                                requestDetails?.status == "Approved"?(
                                    <div className='flex flex-row  text-lg border px-5 py-2' >
                                            <span onClick={()=>{updateStatus("Completed")}} className='font-semibold  text-green-500  cursor-pointer'>
                                                Device Submited
                                            </span>
                                        </div>
                                    
                                    ):
                                    (
                                    <div className='flex flex-row px-10 py-2  text-lg border gap-16' >
                                        <span className='font-semibold  text-blue-500 cursor-pointer' onClick={()=>{updateStatus("Approved")}}>
                                            Accept
                                        </span>
                                        <span className='font-semibold  text-red-500 cursor-pointer' onClick={()=>{deleteRequest(requestId)}}>
                                            Delete
                                        </span>
                                    </div>
                                        
                                    )
                                
                            )
                            
                        }
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    )
  )
}

export default RequestView