import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import service from '../appwrite/config';
import Button from '../components/Button';

function Requests() {
  const [requests, setRequests] = useState([]);
  const [type, setType] = useState('Applied');
  const userData = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.token);

  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when starting to fetch requests
    service.getRequests({ query: type }).then(requests => {
      if (requests) {
        setRequests(requests);
        setLoading(false); // Set loading to false when requests are fetched
      }
    });
  }, [type]);

  // Function to delete a request
  const deleteRequest = requestId => {
    setLoading(true); // Set loading to true before deleting the request
    // Perform deletion on the backend
    service.deleteRequest(requestId).then(res => {
      if (res) {
        console.log('Request deleted');
        // Update the local state after deletion
        const updatedRequests = requests.filter(request => request.$id !== requestId);
        setRequests(updatedRequests);
        setLoading(false); // Set loading to false after request deletion
      }
    });
  };

  return (
    <div className='px-6 min-w-60'>
      <div className='flex w-full justify-between  pt-5 '>
        <p className='text-3xl hidden md:block font-semibold'>Requests</p>
        <svg onClick={() => {
          console.log("clicked");
          const sidebar = document.getElementById('sidebar');
          if (sidebar) {
          sidebar.classList.toggle('hidden');
          }
        }}
         className="h-8 w-8 block md:hidden font-semibold text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="16" y2="18" />
        </svg>
        <div className='flex gap-5'>
          <div className='flex border rounded-sm px-4  py-2'>
            <select
              name='Requests'
              onChange={e => {
                setType(e.target.value);
              }}
              id=''
              className='border-none outline-none'
            >
              {/* <option value='All requests'>All requests</option> */}
              <option value='Applied'>Applied</option>
              <option value='Completed'>Completed</option>
            </select>

          </div>
          <Link to='/form' className=' flex  inline-bock   '>
            <Button className='w-full font-medium flex justify-between items-center gap-3 text-lg '>
              <p className='hidden lg:block'>Create request</p>
              <svg class="h-7 w-7 text-white font-medium" fill="none" viewBox="0 0 26 26" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </Link>
        </div>

      </div>
      <div className='overflow-x-auto flex text-gray-800 gap-3 mt-6'>
        {loading ? ( // Render loading placeholder if loading is true
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              Array.from({ length: [9] }).map((_, index) => (
                <div className='border p-5 rounded-md animate-pulse'>
                  <div className='flex justify-between gap-3'>
                    <div className='w-56 max-w-56 px-4 py-3 cursor-pointer bg-gray-200 rounded-xl'></div>
                  </div>
                  <div className='flex gap-2 text-sm mt-1'>
                    <div className='bg-gray-200 w-20 px-4 py-2 flex items-center rounded-lg'></div>
                    <div className='bg-gray-200 w-20 px-4 py-2 flex justify-center items-center rounded-lg'></div>
                  </div>
                  <div className='bg-gray-200 text-sm text-gray-400 py-2 w-64 max-w-72 truncate mt-3 rounded-md'></div>
                </div>
              ))
            }
          </div>



        ) : (
          <div className=' flex flex-col w-full justify-center items-center sm:grid sm:grid-cols-2 lg:grid-cols-3  gap-4'>
            {requests.map(request => (
              <div key={request.$id} className='border sm:w-auto w-full  p-5 rounded-md'>
                <div className='flex justify-between gap-3'>
                  <Link
                    to={`/request/${request.$id}`}
                    state={{ requestId: request.$id, userId: request.userId, companyId: request.companyId }}
                    className='max-w-56 truncate font-medium text-lg cursor-pointer'
                  >
                    #{request.requestId}
                  </Link>
                  <div className='flex items-center gap-1 text-xs'>
                    <svg
                      onClick={() => deleteRequest(request.requestId)}
                      className='h-6 w-6 cursor-pointer text-red-400'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <polyline points='3 6 5 6 21 6' />
                      <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                      <line x1='10' y1='11' x2='10' y2='17' />
                      <line x1='14' y1='11' x2='14' y2='17' />
                    </svg>
                  </div>
                </div>
                <div className='flex gap-2 text-sm mt-1'>
                  <p className='bg-blue-50 text-blue-500 w-fit px-2 py-0.5 flex justify-center items-center rounded-sm'>{request.requestStatus}</p>
                  <p className='bg-gray-50 text-gray-400 w-fit px-2 flex justify-center items-center rounded-sm'>{request.requestType}</p>
                </div>
                <p className='text-sm text-gray-400 max-w-72 truncate mt-3'> {request.requestDescription}</p>
              </div>

            ))}

          </div>

        )}
      </div>

    </div>
  );
}

export default Requests;
