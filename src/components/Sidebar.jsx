import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import LogoutBtn from './Header/LogoutBtn';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import service from '../appwrite/config';

function Sidebar() {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser.authorities[0].authority);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }

        fetchData();
    }, []);

    const logoutHandler = async () => {
        try {
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div id='sidebar' className='h-screen w-screen md:w-auto  flex-col z-10  transition-transform bg-white flex    md:flex'>
            <div className='px-3 mt-3 flex justify-between items-center pr-5 '>
                <Link to='/news' className={`flex items-center p-2 px-3 text-gray-800 rounded-md`}>
                    <Logo />
                </Link>
                <svg
                onClick={() => {
                    console.log("clicked");
                    const sidebar = document.getElementById('sidebar');
                    const header = document.getElementById('newsHeader');

                    if (sidebar) {
                      header.classList.toggle('z-10');
                    sidebar.classList.toggle('hidden');
                    }
                  }}
                class="h-8 w-8 text-gray-400 block md:hidden"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>

            </div>
            
            <div id="separator-sidebar" className="flex w-full mt-4 flex-col top-0 left-0  md:w-64 flex-1 gap-2  " aria-label="Sidebar">
            <div className=" px-3 mt-5 overflow-y-auto  flex-1   ">
                <ul className="space-y-2 font-medium">
                    {
                        (user == "USER") ? 
                         (
                           <div className='flex flex-col gap-1 duration-200 ease-in-out'>
                                {/* <li>
                                    <Link to={"/explore"} className="flex items-center p-2 text-gray-800 rounded-lg  hover:bg-white group ">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>
                                    </Link>
                                </li> */}
                                {/* <li>
                                    <Link href="#" className="flex items-center p-2 text-gray-800 rounded-lg   hover:bg-white group ">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Notification</span>
                                    <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full  ">3</span>
                                    </Link>
                                </li> */}
                                 {/* <li>
                                    <Link to={"/form"} className="flex items-center p-2 text-gray-800 rounded-lg  hover:bg-white group ">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Create request</span>
                                    </Link>
                                </li> */}
                                <li>
                                    <Link to={'/requests'} className={`flex items-center p-2 px-3 text-gray-800 rounded-md   hover:bg-green-50  
                                        ${
                                            location.pathname === '/requests' ? '  bg-green-50' : ''
                                        }
                                    `}>
                                    <svg class="h-7 w-7 text-gray-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="9" y1="9" x2="10" y2="9" />  <line x1="9" y1="13" x2="15" y2="13" />  <line x1="9" y1="17" x2="15" y2="17" /></svg>
                                    <span className="flex-1 ms-5 text-lg whitespace-nowrap">Requests</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/profile"} className={`flex items-center p-2 px-3 text-gray-800 rounded-md    hover:bg-green-50 
                                      ${
                                        location.pathname === '/profile' ? 'bg-green-50' : ''
                                    }
                                    `}
                                    >
                                    <svg class="h-7 w-7 text-gray-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                    <span className="flex-1 ms-5 text-lg whitespace-nowrap">Profile</span>
                                    </Link>
                                </li>
                           </div> 
                          ): 
                         (
                            <div>
                                <li>
                                    <Link to={"/inbox"} className="flex items-center p-2 text-gray-800 rounded-lg  hover:bg-white group ">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Appointment Inbox</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/dashboard"} className="flex items-center p-2 text-gray-800 rounded-lg  hover:bg-white group ">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/history"} className="flex items-center p-2 text-gray-800 rounded-lg  hover:bg-white group ">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">History</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/profile"} className="flex items-center p-2 text-gray-800 rounded-lg  hover:bg-white group ">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to={"/profile"} className="flex items-center p-2 text-gray-800 rounded-lg  hover:bg-white group ">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Events</span>
                                    </Link>
                                </li> */}
                            </div>
                         )

                        
                    } 
                   <li>
                        <Link to={"/news"} className={`flex items-center p-2 px-3 rounded-md text-gray-800    hover:bg-green-50 
                            ${
                            location.pathname === '/news' ? 'bg-green-50' : ''
                        }
                        `}
                        >
                        <svg class="h-7 w-7 text-gray-800"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                        </svg>
                        <span className="flex-1 ms-5 text-lg whitespace-nowrap">News</span>
                        </Link>
                    </li>
        
                </ul> 
            </div>
            <div className='p-3  py-4 cursor-pointer' >
               
                <LogoutBtn/>
            </div>
        </div>
        </div>
    );
}

export default Sidebar;
