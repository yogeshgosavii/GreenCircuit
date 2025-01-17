import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';

function LogoutBtn({ className }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [label, setLabel] = useState('');

    const logoutHandler = async () => {
        await authService.logout().then(() => {
            dispatch(logout());
        });

        if (label === 'ADMIN') {
            navigate('/organization/login', { state: { label: 'organization' } });
        } else {
            navigate('/user/login', { state: { label: 'user' } });
        }
    };

    useEffect(() => {
        async function fetchUserAuthority() {
            try {
                const user = await authService.getCurrentUser();
                const authority = user?.authorities[0]?.authority;
                if (authority) {
                    setLabel(authority);
                }
            } catch (error) {
                console.error('Error fetching user authority:', error);
            }
        }

        fetchUserAuthority();
    }, []);

    return (
        // <button
        //     className={`inline-bock duration-200 hover: hover:text-red-600 text rounded-lg ${className}`}
        //     onClick={() => {
        //         logoutHandler();
        //     }}
        // >
        //     Logout
        // </button>
         <div className="flex items-center p-2 px-3 text-gray-800 rounded-md hover:bg-red-50 hover:text-red-500"
         onClick={() => {
          logoutHandler();
      }}
         >
            <svg class="h-7 w-7 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
            <span className="flex-1 ms-5 whitespace-nowrap font-medium text-lg">Logout</span>

         </div>
    );
}

export default LogoutBtn;
