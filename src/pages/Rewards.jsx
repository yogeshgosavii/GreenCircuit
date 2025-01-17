import React from 'react'
import reward1 from '../assets/reward1.png'
import reward2 from '../assets/reward2.png'
import reward3 from '../assets/reward3.png'
import reward4 from '../assets/reward4.png'


function Rewards() {
  return (
    <div className='w-fit grid grid-cols-2 gap-5 p-6'>
        <div className='border flex flex-row p-5'>
            <div className='flex flex-col justify-center items-center p-4'>
                <img src={reward1} className='h-44 w-48 aspect-square' alt="" />
                <span className='text-xl font-semibold mt-2'>100 coins</span>
            </div>
            <div className='mt-8'>
                <span className='text-2xl font-semibold'>Mobile</span>
                <p className='text-gray-500'> Turn in our mobile and get 100 coins in your account</p>
            </div>
        </div>
        <div className='border flex flex-row p-5'>
            <div className='flex flex-col justify-center items-center p-4'>
                <img src={reward2} className='h-36 w-80 aspect-square' alt="" />
                <span className='text-xl font-semibold mt-2'>200 coins</span>
            </div>
            <div className='mt-8'>
                <span className='text-2xl font-semibold'>Laptoop</span>
                <p className='text-gray-500'> Rather than getting your broken laptop fixed recycle it to earn 200 coins to get a new one</p>
            </div>
        </div>
        <div className='border flex flex-row p-5'>
            <div className='flex flex-col justify-center items-center p-4'>
                <img src={reward3} className='h-32 w-96 aspect-square' alt="" />
                <span className='text-xl font-semibold mt-2'>400 coins</span>
            </div>
            <div className='mt-8'>
                <span className='text-2xl font-semibold'>Computer </span>
                <p className='text-gray-500'> Tired of playing games on computer try playstation and as you dont need computer anymore recycle it 400 coins</p>
            </div>
        </div>
        <div className='border flex flex-row p-5 '>
            <div className='flex flex-col justify-center items-center p-4'>
                <img src={reward4} className='h-36 w-80 aspect-square' alt="" />
                <span className='text-xl font-semibold mt-2'>2000 coins</span>
            </div>
            <div className='mt-8'>
                <span className='text-2xl font-semibold'>Group Appliences</span>
                <p className='text-gray-500'> Get the appliences in larger quantity to recycle and get a larger reward up 2000 coins</p>
            </div>
        </div>
    </div>
  )
}

export default Rewards