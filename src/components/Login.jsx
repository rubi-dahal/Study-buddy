import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [isLogin, setIsLogin] = useState(false)

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'' 
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted")
    toast.success(isLogin ? "Logged in!" : "Account created!");
    navigate('/dashboard')
  }
  const navigate = useNavigate()

  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
  return (
    <div className="flex justify-center items-center w-full h-screen bg-[hsl(250,62%,15%)]">
      
      <div className="border border-gray-700 bg-[hsl(250,62%,18%)] px-8 py-10 rounded-xl shadow-lg w-80">
        
        <h2 className="font-bold text-gray-100 text-3xl mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          {!isLogin && (
            <input
              type="text"
              name='name' value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="px-3 py-2 rounded-md bg-transparent border border-gray-600 text-gray-200 outline-none focus:border-purple-400"
              required
            />
          )}

          <input
            type="email"
            name='email' value={formData.email}
            onChange={ handleChange}
            placeholder="Email"
            className="px-3 py-2 rounded-md bg-transparent border border-gray-600 text-gray-200 outline-none focus:border-purple-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            className="px-3 py-2 rounded-md bg-transparent border border-gray-600 text-gray-200 outline-none focus:border-purple-400"
            required
          />

         <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition-all text-white py-2 rounded-md font-semibold hover:bg-purple-800"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          
        </form>

        <p className="text-gray-400 text-sm text-center mt-5">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </p>

        <button
          onClick={toggleLogin}
          className="text-purple-400 hover:text-purple-300 text-sm w-full mt-2"
        >
          {isLogin ? "Sign Up here!" : "Login here!"}
        </button>

      </div>
    </div>
  )
}

export default Login