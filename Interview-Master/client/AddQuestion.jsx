import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreviousMap from 'postcss/lib/previous-map';

export const AddQuestion = (props) => {

    const [ content, setContent ] = useState('');
    const [ thumbs, setThumbs ] = useState('');
    const [ tags, setTags ] = useState('');
    const [ company, setCompany ] = useState('');

    const addQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/question/add', { //backend route
                content,
                tags,
                company,
                thumbs, //??
                questionID: props._id,
            })
            if (response.status === 200) {
                props.setTrigger(false)
                props.setRefresh(true)
                setContent('')
                setTags('')
                setCompany('')
                setThumbs('') // ???
            }
        }
        catch (err) {
            console.log('error')
        }
    }

    return (props.trigger) ? (
        <div>
            <div className='fixed top-1/4 inset-x-0 mx-auto h-1/2 w-1/2 bg-purple-200 bg-opacity-95 rounded-xl'>
                <div className='flex justify-end pr-3 pt-3 text-xl text-semibold'>
                    <button onClick={() => props.setTrigger(false)}>X</button>
                </div>
                
                <form 
                onSubmit={addQuestion}
                className='flex flex-col items-center justify-center text-2xl text-semibold'>
                    New technical interview question:
                <textarea
                    className='flex m-5 max-w-none w-3/4 focus:ring-purple-500 focus:border-purple-500'
                    type='text'
                    rows='5'
                    placeholder='Enter interview question'
                    onChange={(e) => setContent(e.target.value)}
                >
                </textarea>
                <input 
                    className='flex m-5 w-1/2'
                    type='text'
                    placeholder='Enter company'
                    onChange={(e) => setCompany(e.target.value)}
                >
                </input>
                <input 
                    className='flex m-5 w-1/2'
                    type='text'
                    placeholder='Enter tags (Ex. BSTs)'
                    onChange={(e) => setTags(e.target.value)}
                >
                </input>
                <button 
                    className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Post question!
                        </span>
                </button>   
                </form>
            </div >
        </div>
    ) : '';
}