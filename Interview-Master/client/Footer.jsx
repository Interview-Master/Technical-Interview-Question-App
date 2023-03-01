import React from 'react'
import jiggly from './assets/jigglypuff.gif'

export const Footer = () => {

    return (
        <div className="flex flex-row justify-center fixed absolute bottom-0 inset-x-0 bottom-0 w-screen z-10 drop-shadow-xl text-lg">
            Built by Jigglypuff
            <img src={jiggly} alt='Our team'/>
        </div>
    )
}