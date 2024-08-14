import React,{useState} from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Register = () => {
const openLoginModal = () => {
  const loginModal = document.getElementById("my_modal_5");
  if (loginModal) {
    loginModal.showModal();
  }
};
const [formData, setFormData] = useState({
name : '',
email :'',
password:'',
username:''
})
const{name,email,password,username} = formData;
const navigate =useNavigate();

const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

const onSubmit = async e =>{
    e.preventDefault();

    try{
        const res=await axios.post('/api/users/register',formData)
        console.log(res.data)
        
             if(res.data){
  
    toast.success("Signup Successfull")}
                localStorage.setItem('token', res.data.token);
navigate('/profileUpdate')
    }catch(err){
        console.error(err.response?.data || 'Server Error'); // Handles errors
            
            // Display detailed error messages
            if (err.response && err.response.data && Array.isArray(err.response.data.errors)) {
                err.response.data.errors.forEach(error => toast.error(error.msg));
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Something went wrong');
            }
    }
}
  return (

<>
  <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-black bg-gray-400 opacity-100">
                    <h3 className="font-bold text-2xl">Hey Welcome Back :D</h3>
                    <form onSubmit={onSubmit}> {/* Form element with onSubmit handler */}
                         <input
                            type="text"
                            name="name"
                            placeholder='Name'
                            value={name}
                            onChange={onChange}
                            className='h-8 w-96 rounded-lg mt-4 text-sm p-2 placeholder-black'
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder='Email'
                            value={email}
                            onChange={onChange}
                            className='h-8 w-96 rounded-lg mt-4 text-sm p-2 placeholder-black'
                        />
                         <input
                            type="text"
                            name="username"
                            placeholder='Username'
                            value={username}
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
                            <button type="submit" className="btn h-8 w-20">Signup</button> {/* Submit button */}
                        </div>
                    </form>
                </div>
            </dialog>


</>
  )
}

export default Register