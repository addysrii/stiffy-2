import React from 'react'
import Navigaton from '../components/Navigaton'
import img from "../public/banner.jpg"
import Login from '../components/Login'
import Register from '../components/Register'

const Landing = () => {
  return (
 <>
 <Navigaton/>
<div className='bg-gray-400 bg-opacity-100 '>
<div className='mx-20 flex flex-row content-evenly  '>
  <div className='mr-4 mt-16 h -1/2 w-1/2 text-white text-2xl flex flex-col'>
  <h1 className='n text-6xl font-bold text-black'>Vibrant Social Interactions on Stiff </h1>
   <h1 className='mt-2'>Connect with friends and the world around you in a lively, colorful platform. </h1>
  <div className='flex flex-row  mt-2 space-x-2 '>
  <button className="btn bg-yellow-600 rounded-full text-md w-20 h-10 mt-1 text-white " onClick={()=>document.getElementById('my_modal_6').showModal()}>
    Register</button>
 <Register/>
  {/* <button className='bg-slate-900 rounded-full text-md w-20 h-10 mt-1'>Login</button> */}
  <button className="btn bg-slate-900 rounded-full text-md w-20 h-10 mt-1 text-white " onClick={()=>document.getElementById('my_modal_5').showModal()}>
    Login</button>
 <Login/>
 </div>
  </div>
 
<div className=' mt-16 mb-48 ml-6'>
  <img  src={img} alt="" className='rounded-lg h-80' />
</div>
</div>

</div>

 </>
  )
}

export default Landing