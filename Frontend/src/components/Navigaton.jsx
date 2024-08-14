import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Navigaton = () => {
  return (
    <>
    <div className="navbar bg-black border-b-2 border-white rounded-t-lg">
  <div className="flex-1 flex items-center">
   <FontAwesomeIcon icon={faSignal} className="text-white ml-3" />
    <a className="btn btn-ghost text-xl text-white">Stiffy</a>
  </div>
  <div className="flex-none gap-2 flex items-center ">
    <div className="flex items-center bg-slate-600 rounded-md">
      <FontAwesomeIcon icon={faMagnifyingGlass} className='text-white ml-3' />
      <input type="text"  placeholder="Search" className="bg-slate-600 input input-bordered text-white w-40 h-10 border-none md:w-auto" />
    </div>
       <div className='h-5 w-5 flex mr-28 ml-5 mb-7 space-x-5'>
          <button className="btn btn-ghost btn-circle bg-slate-700">
      <FontAwesomeIcon icon={faHouse} className=" text-white w-5 h-5" />
      </button>
       <button className="btn btn-ghost btn-circle bg-slate-700 " >
      <FontAwesomeIcon icon={faCompass} className="text-white w-5 h-5" />
      </button>
       </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </>
  )
}

export default Navigaton