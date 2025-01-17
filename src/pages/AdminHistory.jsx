import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { Button } from '../components'
import store from '../store/store';
import {useSelector} from 'react-redux'
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';
import RequestView from '../components/RequestView';
import { useNavigate } from "react-router-dom";


function AdminHistory() {
    const [requests, setRequests] = useState([]);
    const [type, setType] = useState("All requests");
    const userData = useSelector(state => state.auth.userData);
    const [userId, setuserId] = useState('');
    const [userDetails, setuserDetails] = useState({});
    const [view, setview] = useState(false);
    const [requestId, setrequestId] = useState("");
    const navigate = useNavigate();

    // console.log(requestId);
    console.log(userData);


    useEffect(()=>{
      service.getRequests({query : "Completed",companyId : userData.$id}).then((user)=>{
        if(user){
          setRequests(user.documents)
          console.log(requests);
  
        }
      })
    },[type,userId])
  return (
    <div >
                <div className='px-6'>
                    <div className=' flex w-full justify-between  p-4 '>
                    {/* <div className='flex  w-full max-w-screen-sm pb-1'>
                        <div className='rounded-s-lg bg-gray-50 border  flex-1 h-full py-2.5'>
                        <div class="flex   flex-1 w-full">
                            <input class="bg-gray-50 outline-none px-2 ml-2 w-full" type="text" placeholder="Enter the number of your request.." />
                        </div>
                        </div>
                        <Button className=" border bg-gray-200 py-2.5  px-3 text-white font-semibold rounded-e-lg rounded-s-none transition duration-3000 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        </Button>
                    </div> */}
                    {/* <div className='flex border px-4'>
                        <select name="Requests"
                        onChange={(e)=>{
                        setType(e.target.value)
                        console.log(type);
                        }}  id="" className='border-none'>
                        <option value="All requests">All requests</option>
                        <option value="Approved">Approved requests</option>
                        <option value="Applied">Unapproved requests</option>
                        <option value="Completed">Completed requests</option>

                        </select>
                    </div> */}
                    </div>
                    <div>
                    <div class=" overflow-x-auto  ">
                        <table class="w-full text-sm text-left rtl:text-right border text-gray-800 align-top ">
                            <thead class="text-xs  text-gray-700 uppercase bg-gray-100  ">
                                <tr >
                                    <th scope="col" className="px-6 py-3 ">
                                        Request Id
                                    </th>
                                    <th scope="col" className="px-6 py-3  ">
                                        Feedback
                                    </th>
                                    <th scope="col" className="px-6 py-3 ">
                                        Process Date
                                    </th>
                                    
                                    {/* <th scope="col" className="px-6 py-3 ">
                                        Action
                                    </th> */}
                                </tr>
                            </thead>
                            {
                            requests.map((request)=>{
                                const userDetails = service.getUserDetails(request.userId)
                                return(
                                <tbody key={request.$id}>
                                    <tr  className="bg-white border-b align-top cursor-pointer border" onClick={()=>{setview(true);console.log("hello");navigate(requestId,{state :{userId : request.userId,requestId : request.$id}})  ;setrequestId(request.$id);} } >
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10">
                                            {request.$id}
                                        </td>
                                        <td class="px-6 py-4 w-96">
                                            {/* <div className='flex gap-1'>
                                                <p className='font-semibold'>Username :</p> <p> {request.username}</p>
                                            </div>
                                            <div className='flex gap-1'>
                                                <p className='font-semibold'>Address :</p>  <p>{request.address}</p>
                                            </div>
                                            <div className='flex gap-1'>
                                                <p className='font-semibold'>Time slot :</p>  <p>{request.timeslot}</p>
                                            </div> */}
                                            {request?.feedback}
                                        </td>
                                        <td class="px-6 py-4 w-52">
                                            <div className='flex gap-1 min-w-10'>
                                                    <p className='font-semibold'>Start date :</p>  <p>{request.startdate}</p>
                                                </div>
                                                <div className='flex gap-1'>
                                                    <p className='font-semibold'>Completed date :</p>  <p>{request.completedate}</p>
                                            </div>
                                        </td>
                                        {/* <div className=' w-full'>
                                            <td class="px-6 py-4  w-full flex  gap-5">
                                                <Link  to={`${requestId}`} onClick={()=>{setview(true)  ;setrequestId(request.$id);} }  class="font-medium text-blue-600" state={{userId : request.userId,requestId : request.$id}}>View</Link>
                                            </td>
                                        </div> */}
                                     
                                    </tr>
                                </tbody>
                                )
                                
                            })
                            }
                            
                        </table>
                    </div>
                    </div>
                </div>
            </div>
  )
}

export default AdminHistory