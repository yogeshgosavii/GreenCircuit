import React, { useEffect, useState } from 'react'
import Button from './Button'
import {Link ,useNavigate} from 'react-router-dom'
import service from '../appwrite/config';
import {Client,Account,ID, Databases, Query} from 'appwrite'
import {useSelector} from 'react-redux'



function PlaceCard({companyName="Company name",distance = "23km",location="Kandivali west",completedRequests="4",companyId}) {
const navigate = useNavigate();
const user = useSelector((state) => state.auth.userData)

const [pendingRequests, setPendingRequests] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async (companyId) => {
      try {
        const res = await service.getRequests( Query.equal("companyId", [companyId]), user.$id ,"all","yes" );
        console.log("pendingRequest " + res.total+" companyId "+companyId);
        setPendingRequests(res.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(companyId)
  }, [pendingRequests]);
  return (
    <div className='bg-gray-100 p-5 rounded-xl text-gray-900'>
        <div className='flex  border-black   w-full'>
            <div className='font-semibold text-2xl  w-full'>{companyName}</div>
            <div className='items-center  flex align-super   '>
                <p className='bg-green-200 px-3 py-0.5 text-green-700 rounded-md'>{completedRequests}</p>
            </div>
            {/* <div className='truncate'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae aspernatur nostrum praesentium soluta quasi, recusandae quis delectus magni dolore veritatis consequuntur mollitia nam nobis ab velit nihil! Dolor, praesentium reprehenderit!</div> */}
        </div>

        
        <div className='flex'>
            {/* <div>Location : </div> */}
            <div className='text-gray-400'>{location}</div>
        </div>
        {/* <div className='flex  border-black'>
            <div>Completed Requestes : </div>
            <div> 2</div>
        </div> */}
        <div className='mt-3 flex flex-row justify-between cursor-pointer  border-black'>
               
                <Link to={"/explore/form"} 
                state={{comId: companyId}}
                
                className='font-semibold w-40 text-blue-600 text-lg'>
                    Apply
                </Link>
                <div className={` text-lg  flex gap-2 ${pendingRequests>0 ? 'visible': 'invisible'}`}>
                    <p>Pending requests</p>
                    <p className='text-red-600' >{pendingRequests}</p>
                </div>
                {/* <img src="" alt="" /> */}
        </div>
        
       
        
    </div>
  )
}

export default PlaceCard