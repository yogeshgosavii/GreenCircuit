import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';

function Profile() {
  const user = useSelector((state) => state.auth.userData);
  const [userData, setUserData] = useState({});
  const [label, setLabel] = useState((user.$id)?.split(".")[0]);
  const [activities, setActivities] = useState([]);

  // Dummy activities for testing
  const dummyActivities = [
    {
      id: 1,
      title: 'Dummy Activity 1',
      description: 'This is a description for Dummy Activity 1.',
      date: '2024-03-30'
    },
    {
      id: 2,
      title: 'Dummy Activity 2',
      description: 'This is a description for Dummy Activity 2.',
      date: '2024-03-29'
    },
    {
      id: 3,
      title: 'Dummy Activity 3',
      description: 'This is a description for Dummy Activity 3.',
      date: '2024-03-28'
    }
  ];

  useEffect(() => {
    // Check if user exists before making the API call
    if (user && user.$id) {
      service.getUserDetails(user.$id)
        .then((res) => {
          setUserData(res);
          console.log(res);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });

      // Set dummy activities
      setActivities(dummyActivities);
    }
  }, []);

  return label === "user" ? (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-2/3">
        <div className="flex items-center justify-center mb-6">
          <img src={userData.avatar} alt="User Avatar" className="w-24 h-24 rounded-full" />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">{userData.username}</h2>
          <p className="text-sm text-gray-600">{userData.email}</p>
          <p className="text-sm mt-2">Reward Points: {userData.rewardPoints}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p>{userData.email}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Contact</p>
            <p>{userData.contact}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Adharcard Number</p>
            <p>{userData.adharcard}</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          <p>{userData.address}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Activity Tracking</h3>
          <ul>
            {activities.map((activity) => (
              <li key={activity.id} className="mb-4">
                <h4 className="text-lg font-semibold">{activity.title}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400">{activity.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
}

export default Profile;
