import React from 'react'
import Button from './Button'

function SearchInput({handleSearch,...props}) {
  return (
    <div class="flex  items-center   rounded-lg">
         {/* <div className="flex py-2.5 border border-e-0  px-4 bg-gray-100   rounded-s-lg text-gray-600 font-semibold cursor-pointer">
        <span>All divices</span>

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div> */}
      <div className='border-l rounded-s-lg bg-gray-50 border-y  flex-1 h-full py-2.5'>
        <div className="flex   flex-1 ">
            {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg> */}
            <input className="bg-gray-50 outline-none px-2 ml-2" {...props} type="text" placeholder="Enter your locality name..." />
        </div>
      </div>
      
     
      <Button className=" border border-[#04aa4f] py-2.5  px-3 text-white font-semibold rounded-e-lg rounded-s-none transition duration-3000 cursor-pointer" onClick={()=>{handleSearch()}}>
        Search
      </Button>
      
    </div>
  )
}

export default SearchInput