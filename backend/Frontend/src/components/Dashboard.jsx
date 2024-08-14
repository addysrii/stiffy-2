import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigaton from './Navigaton';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            try {
                const res = await axios.get('/api/user');
                console.log('User data:', res.data); // Log user data
                setUserData(res.data);
            } catch (err) {
                console.error('Error fetching user data:', err.response?.data || err.message);
            }
        };

        fetchData();
    }, []);

    // Construct profile picture URL
    const profilePictureURL = userData?.profilePicture ? `http://localhost:5002${userData.profilePicture}` : '';

    // Log the profile picture URL
    

    return (
        <div className='bg-black'>
            <Navigaton/>
            <div>
                {userData ? (
                    <div className='bg-[#323232] ml-72 w-[600px] h-[205px] mt-4 rounded-lg text-white'>
                        {profilePictureURL && (
                            <img src={profilePictureURL} alt="Profile" className="w-20 h-20 rounded-full ml-4 mt-4" />
                        )}
                        <p className='ml-4'>Welcome, {userData.name}!</p>
                        <p>Email: {userData.email}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
