import React, { useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
  const modalRef = useRef(null);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close(); // Close the modal
        }
    }
    const onSubmit = async e => {
        e.preventDefault(); // Prevents default form submission behavior
        try {
            const res = await axios.post('/api/users/login', formData); // Sends POST request to /api/login
            console.log(res.data);
             if(res.data){
  
    toast.success("Login Successfull")}
            localStorage.setItem('token', res.data.token); // Stores token in localStorage
            closeModal();
            navigate('/dashboard'); // Redirects to the dashboard page
        } catch (err) {
            console.error(err.response?.data || 'Server Error'); // Handles errors
          if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Something went wrong');
            }
            closeModal()
        }
    };

    return (
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle"  ref={modalRef}>
                <div className="modal-box text-black bg-gray-400 opacity-100">
                    <h3 className="font-bold text-2xl">Hey Welcome Back :D</h3>
                    <form onSubmit={onSubmit}> {/* Form element with onSubmit handler */}
                        <input
                            type="text"
                            name="email"
                            placeholder='Email'
                            value={email}
                            onChange={onChange}
                            className='h-8 w-96 rounded-lg mt-4 text-sm p-2 placeholder-black'
                        />
                        <input
                            type="password" // Changed to password for security
                            name="password"
                            placeholder='Password'
                            value={password}
                            onChange={onChange}
                            className='h-8 w-96 rounded-lg mt-4 text-sm p-2 placeholder-black'
                        />
                        <div className="modal-action">
                            <button type="submit" className="btn h-8 w-20">Login</button> {/* Submit button */}
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default Login;
