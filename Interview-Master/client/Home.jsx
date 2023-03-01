import React from 'react'
import photo from './assets/photo.jpeg'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <Link to='/login'>
            <div className='flex flex-col items-center justify-center h-screen w-screen'>
                <button><img src={photo} alt='Whiteboard like a pro' /></button>
            </div>
        </Link>
    )
}

export default Home;