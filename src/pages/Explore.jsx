import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import SearchInput from '../components/SearchInput'
import PlaceCard from '../components/PlaceCard'
import authService from '../appwrite/auth';
import authSlice from '../store/authSlice';
import service from '../appwrite/config';
import {Link, useNavigation} from 'react-router-dom'
import {Client,Account,ID, Databases, Query} from 'appwrite'

function Explore() {
  const user = useSelector((state) => state.auth.userData)
  const [companyList, setcompanyList] = useState([]);
  console.log(user);
  const [loader, setloader] = useState(true);
  const [reward, setreward] = useState("");
  const navigate = useNavigation();
  
  useEffect(()=>{
    if(user){
       service.getUserDetails(user.$id).then((res)=>{
      setreward(res.reward)
    });
    }
   
  },[])
  

  // console.log(userDetails);
  const [search, setsearch] = useState("");
  
  const updatedCompanylist = ()=>{
    service.getCompanyList(search).then((list)=>{
      setcompanyList(list.documents)
    })
  }
  useEffect(() => {
    service.getCompanyList().then((list)=>{
      if(list){
        setcompanyList(list.documents);
        console.log(companyList);
      }
    })
    setloader(false)
   
  }, []);
  
  
  
    
     return (
      loader?
      <div>loading...</div>
      :
      <div className='h-full flex flex-col px-3'>
          <div  className=' w-full  flex justify-between border-b  p-4 pb-5 '>
              <div  className='max-w-screen-sm flex-1 '>
                  <SearchInput onChange={(e)=>{setsearch(e.target.value)}} handleSearch= {()=>{updatedCompanylist()}}/>
              </div>
              
          </div>
          <div on className=' overflow-hidden gap-2 pt-4 grid grid-cols-3'>
  
            {
              companyList.map((company)=>{
                console.log("my : "+company.$id);
                
                return (
                  <PlaceCard companyName={company.companyName} completedRequests={company.completedRequests} location={company.location} companyId = {company.$id}  />
                  )
          
                // const pendingRequest = service.getPendingRequests(company.$id,user.$id)
                // console.log("p "+pendingRequest);
               
              })
            }
  
  
  
          </div>
      </div>
     )
      
    
  
  
}

export default Explore