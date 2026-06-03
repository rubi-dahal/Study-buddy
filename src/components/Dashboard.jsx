import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { 
  FaFire, 
  FaPlus, 
  FaTrash, 
  FaCheckCircle,
  FaCircle,
  FaBook,
  FaChartLine,
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa'
import {
  MdOutlineAccessTime,
  MdOutlineCalendarToday,
  MdOutlineCheckCircle,
  MdOutlinePending,
  MdEdit,
  MdClose
} from 'react-icons/md'

const Dashboard = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [streak, setStreak] = useState(0)
  const [examDate, setExamDate] = useState('')
  const [showExamModal, setShowExamModal] = useState(false)
  const [editingExamDate, setEditingExamDate] = useState('')
  const [subjects, setSubjects] = useState([])
  const [newSubject, setNewSubject] = useState('')
  const [hoursStudied, setHoursStudied] = useState(0)
  const [userName, setUserName] = useState('Learner')
  const [daysRemaining, setDaysRemaining] = useState(0)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('studyTodos')) || []
    const savedStreak = JSON.parse(localStorage.getItem('studyStreak')) || 0
    const savedExamDate = localStorage.getItem('examDate') || ''
    const savedSubjects = JSON.parse(localStorage.getItem('studySubjects')) || []
    const savedHours = JSON.parse(localStorage.getItem('hoursStudied')) || 0
    const savedName = localStorage.getItem('userName') || 'Learner'
    const lastActiveDate = localStorage.getItem('lastActiveDate')
    const today = new Date().toDateString()

    setTodos(savedTodos)
    setStreak(savedStreak)
    setExamDate(savedExamDate)
    setSubjects(savedSubjects)
    setHoursStudied(savedHours)
    setUserName(savedName)

    // Update streak
    if (lastActiveDate !== today) {
      if (lastActiveDate === new Date(Date.now() - 86400000).toDateString()) {
        setStreak(savedStreak + 1)
        localStorage.setItem('studyStreak', JSON.stringify(savedStreak + 1))
      } else {
        setStreak(1)
        localStorage.setItem('studyStreak', '1')
      }
      localStorage.setItem('lastActiveDate', today)
    }

    // Calculate days remaining
    if (savedExamDate) {
      const exam = new Date(savedExamDate)
      const today = new Date()
      const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24))
      setDaysRemaining(Math.max(0, diff))
    }
  }, [])

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('studyTodos', JSON.stringify(todos))
  }, [todos])

  // Save subjects to localStorage
  useEffect(() => {
    localStorage.setItem('studySubjects', JSON.stringify(subjects))
  }, [subjects])

  // Save hours to localStorage
  useEffect(() => {
    localStorage.setItem('hoursStudied', JSON.stringify(hoursStudied))
  }, [hoursStudied])

  // Handle exam date change
  const handleExamDateChange = () => {
    if (editingExamDate) {
      setExamDate(editingExamDate)
      localStorage.setItem('examDate', editingExamDate)
      const exam = new Date(editingExamDate)
      const today = new Date()
      const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24))
      setDaysRemaining(Math.max(0, diff))
      setShowExamModal(false)
    }
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        date: new Date().toLocaleDateString()
      }
      setTodos([...todos, todo])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const addSubject = () => {
    if (newSubject.trim()) {
      const subject = {
        id: Date.now(),
        name: newSubject,
        hours: 0
      }
      setSubjects([...subjects, subject])
      setNewSubject('')
    }
  }

  const updateSubjectHours = (id, hours) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, hours: Math.max(0, hours) } : subject
    ))
  }

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id))
  }

  const completedTodos = todos.filter(todo => todo.completed).length
  const pendingTodos = todos.filter(todo => !todo.completed).length
  const totalHours = subjects.reduce((acc, subj) => acc + subj.hours, 0)


  return (
    <div className="min-h-screen bg-[hsl(250,62%,15%)]">
      <Navbar />

      <div className="max-w-7xl px-6 xl:px-0 mx-auto py-12 text-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Hello, {userName}!
            </h2>
            <p className="text-gray-400 mt-2 italic text-lg">"The future belongs to those who believe in the beauty of their dreams."</p>
          </div>

          {/* Streak Card */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 px-6 py-4 rounded-2xl backdrop-blur-md shadow-lg">
            <FaFire className="text-orange-500 w-10 h-10 animate-pulse" />
            <div>
              <h2 className="text-3xl font-bold text-white">{streak}</h2>
              <p className="text-gray-300 text-sm">Day Streak 🔥</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Exam */}
          <div className="bg-white/5 border border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition shadow-md cursor-pointer" onClick={() => setShowExamModal(true)}>
            <MdOutlineCalendarToday className="text-blue-400 w-10 h-10 mb-4" />
            <h4 className="text-gray-400 text-sm">Days Remaining</h4>
            <h3 className="text-4xl font-bold mt-2 text-white">{daysRemaining}</h3>
            <p className="text-gray-500 mt-1 text-sm">Until exam</p>
            <p className="text-blue-400 text-xs mt-2">Click to set exam date</p>
          </div>

          {/* Completed */}
          <div className="bg-white/5 border border-gray-700 rounded-2xl p-6 hover:border-green-500 transition shadow-md">
            <MdOutlineCheckCircle className="text-green-400 w-10 h-10 mb-4" />
            <h4 className="text-gray-400 text-sm">Tasks Completed</h4>
            <h2 className="text-4xl font-bold mt-2 text-white">{completedTodos}</h2>
            <p className="text-gray-500 mt-1 text-sm">Today</p>
          </div>

          {/* Pending */}
          <div className="bg-white/5 border border-gray-700 rounded-2xl p-6 hover:border-yellow-500 transition shadow-md">
            <MdOutlinePending className="text-yellow-400 w-10 h-10 mb-4" />
            <h4 className="text-gray-400 text-sm">Tasks Pending</h4>
            <h2 className="text-4xl font-bold mt-2 text-white">{pendingTodos}</h2>
            <p className="text-gray-500 mt-1 text-sm">Today</p>
          </div>

          {/* Hours */}
          <div className="bg-white/5 border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition shadow-md">
            <MdOutlineAccessTime className="text-purple-400 w-10 h-10 mb-4" />
            <h4 className="text-gray-400 text-sm">Hours Studied</h4>
            <h2 className="text-4xl font-bold mt-2 text-white">{totalHours}h</h2>
            <p className="text-gray-500 mt-1 text-sm">Total</p>
          </div>
        </div>

        {/* Exam Date Modal */}
        {showExamModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
            <div className="bg-[hsl(250,62%,15%)] border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Set Exam Date</h3>
                <button onClick={() => setShowExamModal(false)} className="text-gray-400 hover:text-white">
                  <MdClose size={24} />
                </button>
              </div>
              <input
                type="date"
                value={editingExamDate}
                onChange={(e) => setEditingExamDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4"
              />
              <button
                onClick={handleExamDateChange}
                className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
              >
                Save Exam Date
              </button>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Todo List */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FaBook /> Today's Tasks
              </h3>

              {/* Add Todo */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Add a new task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                />
                <button
                  onClick={addTodo}
                  className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2 transition"
                >
                  <FaPlus /> Add
                </button>
              </div>

              {/* Todo Items */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {todos.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No tasks yet. Add one to get started! 🎯</p>
                ) : (
                  todos.map(todo => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition border border-gray-700"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="text-xl transition"
                      >
                        {todo.completed ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaCircle className="text-gray-500" />
                        )}
                      </button>
                      <span
                        className={`flex-1 ${
                          todo.completed
                            ? 'text-gray-400 line-through'
                            : 'text-white'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Progress Bar */}
              {todos.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400 text-sm">Progress</p>
                    <p className="text-white font-semibold">{Math.round((completedTodos / todos.length) * 100)}%</p>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                      style={{ width: `${(completedTodos / todos.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subjects & Study Tracking */}
          <div className="space-y-6">
            {/* Subjects */}
            <div className="bg-white/5 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FaBook /> Subjects
              </h3>

              {/* Add Subject */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Subject name..."
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSubject()}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition text-sm"
                />
                <button
                  onClick={addSubject}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-1 transition text-sm"
                >
                  <FaPlus /> Add
                </button>
              </div>

              {/* Subject List */}
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {subjects.length === 0 ? (
                  <p className="text-gray-500 text-center py-6 text-sm">Add subjects to track your study time</p>
                ) : (
                  subjects.map(subject => (
                    <div key={subject.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-semibold text-sm">{subject.name}</p>
                        <button
                          onClick={() => deleteSubject(subject.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateSubjectHours(subject.id, subject.hours - 0.5)}
                          className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center text-white font-semibold">{subject.hours}h</span>
                        <button
                          onClick={() => updateSubjectHours(subject.id, subject.hours + 0.5)}
                          className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
