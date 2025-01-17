import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import service from './appwrite/config';

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Initialize user state as null
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser); // Update user state once Promise resolves

                if (currentUser) {
                    const userDetails = currentUser.organization
                        ? await service.getOrganizationDetails(currentUser.organizationId)
                        : await service.getUserDetails(currentUser.userId);

                    dispatch(login({ userData: userDetails }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [dispatch]);

    // Render content conditionally based on loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-row min-h-screen'>
          {
            user?
            <div className='min-h-full z-10 md:w-auto  fixed'>
                <Sidebar />
            </div>:
            null
          }
           
            <div className='flex flex-col flex-1'>
                <div className=''>
                    {/* Render Header component here if needed */}
                </div>
                <div className={`flex-1 flex  ${user ? 'ml-0 md:ml-72' : ''}`}>
                    <main className='w-full'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
