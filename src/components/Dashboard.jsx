import React from 'react'
import Navbar from './Navbar'
import { FaFire } from 'react-icons/fa'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
    <div className='h-screen max-w-7xl m-auto my-8 flex flex-col  text-gray-200'>
     <div className='flex items-center justify-between'>
      <div><h2 className='text-3xl font-bold'>Good Morning, Rubi!</h2>
      <p className='text-gray-400 mt-2'>Here's your dashboard for today:</p></div>
      <div className='flex items-center gap-2 border border-gray-600 px-4 py-2 rounded-lg'>
        <FaFire className='text-orange-500 w-8 h-8' />
        <div>
          <h2>5</h2>
          <p>Day Streak</p>
        </div>
      </div>
    </div>
    <div className='flex items-center justify-between mt-8'>
      <div className='border border-gray-600 px-6 py-4 rounded-lg'>
        <h4 className='text-gray-400 font-light'>Day's remaining for exam</h4>
        <h3 className='text-2xl font-bold'>30</h3>
        <p className='text-gray-400'>Today</p>

      </div>
      <div className='border border-gray-600 px-6 py-4 rounded-lg'>
        <h4 className='text-gray-400 font-light'>Tasks Completed</h4>
        <h2 className='text-2xl font-bold'>4</h2>
        <p className='text-gray-400'>Today</p>
      </div>
      <div className='border border-gray-600 px-6 py-4 rounded-lg'>
        <h4 className='text-gray-400 font-light'>Tasks Pending</h4>
        <h2 className='text-2xl font-bold'>2</h2>
        <p className='text-gray-400'>Today</p>
      </div>
      <div className='border border-gray-600 px-6 py-4 rounded-lg'>
        <h4 className='text-gray-400 font-light'>Hours Studied</h4>
        <h2 className='text-2xl font-bold'>3</h2>
        <p className='text-gray-400'>Today</p>
      </div>
    </div>
    <div>
      <h2>Pomodoro Timer</h2>

    </div>
    </div>
    </div>
  )
}

export default Dashboard