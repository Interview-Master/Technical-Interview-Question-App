import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AddQuestion = (props) => {

    const [ content, setContent ] = useState('');
    const [ thumbs, setThumbs ] = useState('');
    const [ tags, setTags ] = useState('');
    const [ company, setCompany ] = useState('');

    const addQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/', { //backend route
                content,
                tags,
                company,
                thumbs, //??
                questionID: props._id,
            })
            if (response.status === 200) {
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
            <div>
                <div>
                    <button onClick={() => props.setTrigger(false)}>X</button>
                </div>
            </div>
                <form onSubmit={addQuestion}>
                <textarea 
                    type='text'
                    placeholder='Enter Interview Question'
                    onChange={(e) => setContent(e.target.value)}
                >
                </textarea>
                <input 
                    type='text'
                    placeholder='Enter company'
                    onChange={(e) => setCompany(e.target.value)}
                >
                </input>
                <input 
                    type='text'
                    placeholder='Enter tags (Ex. BSTs)'
                    onChange={(e) => setTags(e.target.value)}
                >
                </input>
                    <button>Post Question!</button>   
                </form>
        </div>
    ) : '';
}