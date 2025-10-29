import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className='flex bg-black select-none text-white justify-between items-center px-10 py-3'>
        <div className="logo font-bold text-2xl cursor-pointer ">iTask</div>
        <div className="navOptions flex gap-4">
          <div className="home cursor-pointer hover:underline">Home</div>
          <div className="tasks cursor-pointer hover:underline">Your tasks</div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
