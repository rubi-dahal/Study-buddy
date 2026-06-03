import React from 'react'
import ChatBox from './components/ChatBox'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import './App.css'
import Dashboard from './components/Dashboard'

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chatbox" element={<ChatBox />} />
          <Route path ='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App