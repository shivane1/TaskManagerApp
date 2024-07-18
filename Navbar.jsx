import React from 'react'
import { FaTasks } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
        <nav className='flex bg-green-300 justify-between py-2.5 sticky top-0 z-2 mx-auto'>
            <div className="flex">
            <span className='font-bold mx-5 text-xl hover:cursor-pointer'>TaskPlanner<FaTasks /></span>
            </div>
<div>
    <ul className='flex gap-6 mx-5 items-center'>
        <li className='home cursor-pointer hover:font-semibold '>Home</li>
        <li className='yourtask cursor-pointer hover:font-semibold'>Your Task</li>
    </ul>
</div>
        </nav>
    </>
  )
}

export default Navbar