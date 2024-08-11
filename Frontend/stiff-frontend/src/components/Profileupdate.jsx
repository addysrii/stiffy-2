import React, { useState } from 'react';
import axios from 'axios';

const ProfileSetup = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);
    const [bio, setBio] = useState('');

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleCoverPictureChange = (e) => {
        setCoverPicture(e.target.files[0]);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (profilePicture) formData.append('profilePicture', profilePicture);
        if (coverPicture) formData.append('coverPicture', coverPicture);
        formData.append('bio', bio);

        try {
            const token = localStorage.getItem('token');
            console.log("token in profile update", token);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const res = await axios.put('http://localhost:5002/api/users/profile', formData, config);
            console.log(res.data);
            alert('Profile updated successfully!');
        } catch (err) {
            console.error(err.response?.data || 'Server Error');
            alert('There was an error updating your profile.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Profile Picture:</label>
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </div>
            <div>
                <label>Cover Picture:</label>
                <input type="file" accept="image/*" onChange={handleCoverPictureChange} />
            </div>
            <div>
                <label>Bio:</label>
                <textarea value={bio} onChange={handleBioChange}></textarea>
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ProfileSetup;
