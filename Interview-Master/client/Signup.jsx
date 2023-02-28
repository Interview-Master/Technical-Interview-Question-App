import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

 export const Signup = () => {
    
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')

  const navigate = useNavigate()
  
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('/', { firstName, lastName, email, password})
        navigate('/login')
    } catch (err) {
        setError('Email already registered with this address')
    }
  }
    return (
    <>
      <nav className='flex flex-col items-center justify-center h-screen w-screen'>
        <h1 className='text-4xl font-bold text-purple-700 py-4 my-8 border-b-4 border-purple-500'>Enter Information Here</h1>
        <div className='text-red-700'>{error}</div>
        <form onSubmit={handleSignup}
              className='flex flex-col items-center justify-center text-lg'>
          <input 
            className='p-6 rounded-sm border-solid border-1'
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name:">
          </input>
          <input
            className='p-6 rounded-sm border-solid border-1'
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name:">
          </input>
          <input
            className='p-6 rounded-sm border-solid border-1'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email:">
          </input>
          <input
            className='p-6 rounded-sm border-solid border-1'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password:">
          </input>
          <button className='border-solid rounded-full p-4 border-2 hover:text-blue-400'>Sign Up</button>
        </form>
        <div className='text-red-800 p-6 hover:text-red-600'>
          <Link to="/login">
            <button>Already have an account? Login Here</button>
          </Link>
        </div>
      </nav>
    </> 
    )
}

