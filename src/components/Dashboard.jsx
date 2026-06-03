import React from 'react'
import Navbar from './Navbar'
import { FaFire } from 'react-icons/fa'

const Dashboard = () => {
  return (
    <div><Navbar/>
    <div className='h-screen max-w-7xl flex flex-col  text-gray-200'>
     <div>
      <div><h2>Good Morning, Rubi!</h2>
      <p>Here's your dashboard for today:</p></div>
      <div>
        <FaFire />
        <div>
          <h2>5</h2>
          <p>Day Streak</p>
        </div>
      </div>
    </div>
    <div>
      <div>
        <h4>Day's remaining for exam</h4>
        <h3>30</h3>
        <p>Today</p>

      </div>
      <div>
        <h4>Tasks Completed</h4>
        <h2>4</h2>
        <p>Today</p>
      </div>
      <div>
        <h4>Tasks Pending</h4>
        <h2>2</h2>
        <p>Today</p>
      </div>
      <div>
        <h4>Hours Studied</h4>
        <h2>3</h2>
        <p>Today</p>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Dashboard