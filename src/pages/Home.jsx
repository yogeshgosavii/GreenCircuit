import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import  img1 from '../assets/e3.jpg'
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ecomomy from '../assets/econmomy.jpg'
import ewastePieChart from '../assets/ewastepiechart.jpeg'

function Home() {
    const [greeting, setgreeting] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8084/greet')
          .then(response =>{
            // console.log(response.json());
            return response.json()
          })
          .then(data=> setgreeting(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
  return (
    <div className=' flex flex-col  relative text-gray-800 h0 overflow-y-scroll h-[34.3rem]'>
       <div class="fixed top-0 left-0 w-full bg-white p-4 flex justify-start items-center px-10 font-sans ">
            {/* <div><Logo/></div> */}
            <div className='flex flex-row gap-9  text-lg font-semibold items-center'>
                <Link to={"organization"} className='cursor-pointer'>Organization</Link>
                <Link to={"user"} className='cursor-pointer'>User</Link>
            </div>
        </div>
        <div className=' flex flex-row  justify-between w-full  mt-28  h-96 px-10'>
            <div className='mt-24'>
                <p className='text-[#04aa4f] ml-1 font-semibold text-5xl '>GreenCircuit</p>
                {/* <h2>{greeting} Hello</h2> */}
                {/* {
                    greeting.map(dep=>{
                        console.log(dep);
                        return(
                            <div>
                            <p>Department id {dep.departmentId}</p>
                           <p>Department name {dep.departmentName}</p>

                       </div>
                        )
                       
                    })
                } */}
                <div>
                    <p className='text-xl mt-5 font-semibold'>Reducing E-Waste, Empowering Tomorrow</p>
                    <p className='max-w-2xl mt-2'>In the face of escalating e-waste, Green Circuit stands as a beacon of change. With a firm commitment to responsible disposal, we aim to curtail the rising tide of electronic waste in major Indian cities like Mumbai, Delhi, Bangalore, Chennai, and Kolkata.</p>
                    <p className='mt-11'>Join us in our mission to reduce, reuse, and rejuvenate. Together, let's pave the way for a sustainable future.</p>
                </div>
            </div>
            <div>
                <img src={ewastePieChart} className='aspect-square mix-blend-color-burn h-[25rem]' alt="" />
            </div>
        </div>
        <div class="p-10 mt-36">
            <table class="w-full text-lg text-left rtl:text-right  text-gray-500 border">
                <thead class="text-lg text-gray-700 uppercase bg-gray-200 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Computer/e-waste component
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Process
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Potential Occupational Hazard
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Potential Environmental Hazard
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Cathode ray tubes
                        </td>
                        <td class="px-6 py-4">
                            Breaking, removal of copper yoke and dumping
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Silicosis</li>
                                <li>Cuts from CRT glass</li>
                                <li>Inhalation or contact with phosphor containing cadmium or other metals</li>
                            </ul>
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Lead, barium, and other heavy metals leaching into groundwater and release of toxic phosphor</li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Printer circuit boards
                        </td>
                        <td class="px-6 py-4">
                            Desoldering and removing computer chips
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Tin and lead inhalation</li>
                                <li>Possible brominated dioxin, beryllium, cadmium, and mercury inhalation</li>
                            </ul>
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Air emission of the same substances</li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Dismantled printed circuit board
                        </td>
                        <td class="px-6 py-4">
                            Open burning of waste boards
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Toxicity of workers and nearby residents from tin, lead, brominated dioxin, beryllium, cadmium, and mercury inhalation</li>
                            </ul>
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Tin and lead contamination of immediate environment, including surface and groundwater, brominated dioxins, beryllium, cadmium, and mercury inhalation</li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Chips and other gold-plated compounds
                        </td>
                        <td class="px-6 py-4">
                            Chemical stripping using nitric and hydrochloric acid along riverbanks
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Acid contact with eyes, skin may result in permanent injury</li>
                                <li>Inhalation of mists and fumes of acids, chlorine, and sulfur dioxide gases can cause respiratory irritation to severe effects, including pulmonary edema, circulatory failure, and death</li>
                            </ul>
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Hydrocarbons, heavy metals, brominated substances, etc., discharged directly into the river and banks</li>
                                <li>Acidifies the river, destroying fish and flora</li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Plastics from the computer and peripherals
                        </td>
                        <td class="px-6 py-4">
                            Shredding and low-temperature melting
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Probable hydrocarbon, brominated dioxin, and PAH exposure to workers living in the burning works area</li>
                            </ul>
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Emission of brominated dioxins, heavy metals, and hydrocarbons</li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Secondary steel or copper and precious metal smelting
                        </td>
                        <td class="px-6 py-4">
                            Furnace recovers steel or copper from waste
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Exposure to dioxins and heavy metals</li>
                            </ul>
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Emission of dioxins and heavy metals</li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="bg-white ">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Wires
                        </td>
                        <td class="px-6 py-4">
                            Open burning to recover copper
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Brominated and chlorinated dioxin and PAH exposure to workers living in the burning works area</li>
                            </ul>
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li>Hydrocarbon and ashes, including PAHs discharged into air,water, and soil</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    // <div className='h-full' style={{ backgroundImage: `url('${img1}')`, backgroundSize: 'cover' }}>
    //   <div className=' bg-green-500 p-5 flex flex-row justify-between text-gray-800 text-xl font-semibold  items-center'>
    //     <h1 className='text-gray-800 text-xl font-semibold'>Electrify the Future: Recycle E-Waste, Power Renewability!</h1>
    //     <Link to={"/login"} className='border py-2 px-4 cursor-pointer'> Login / Create Account</Link>
    //   </div>
    // </div>
  )
}

export default Home