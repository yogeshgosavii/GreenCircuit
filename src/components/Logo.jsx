import React from 'react'
import greenpower from  '../assets/greenpower.png'

function Logo({width = '100px'}) {
  return (
   <div className='flex items-center'>
      {/* <img className='w-7 h-8 aspect-square mb-1.5' src={greenpower} alt="logo" /> */}
      <p className='text-[#04aa4f] ml-1 font-semibold text-xl'>GreenCircuit</p>

      {/* <img className='w-6 h-8 aspect-square -rotate-6' src={slash} alt="" /> */}

    
    </div>
    
  )
}

export default Logo