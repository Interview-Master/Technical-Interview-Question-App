import React, {useState} from "react";

export const Signup = () => {
    
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')

    return (
        <div>
    <>
      <nav className='flex flex-col items-center justify-center h-screen w-screen'>
        <h1 className='text-4xl font-bold text-purple-700 py-4 my-8 border-b-4 border-purple-500'>Welcome to your future</h1>
        <div className='text-red-700'>{error}</div>
        <form onSubmit={handleLogin}
              className='flex flex-col items-center justify-center text-lg'>
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
            placeholder="Password:">
          </input>
          <button className='border-solid rounded-full p-4 border-2 hover:text-blue-400'>Login</button>
        </form>
        <div className='text-red-800 p-6 hover:text-red-600'>
          <Link to="/signup">
            <button>Don't have an account? Become a Member</button>
          </Link>
        </div>
      </nav>
    <Routes>
      <Route path='/signup' element={Signup} />
      <Route path='/dashboard' element={Dashboard} />
    </Routes>
    </>
        </div>
    )
}