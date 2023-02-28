import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const QuestionPopup = (props) => {

    const [ comment, setCommentBody ] = useState('');
    const [ allComments, setAllComments ] = useState('');

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/', { //backend route
                comment,
                questionID: props._id,
            })
            if (response.status === 200) {
                setCommentBody('')
            }
        }
        catch (err) {
            console.log('error')
        }
    }

    useEffect(async () => {
        try {
            if (props.trigger) {
                const response = await axios.get('/') //waitfor backend route
            }
            const allComments = [];
            for (let i = 0; i < response.data.length; i++) {
                allComments.push(
                    <div key={i}>
                        {response.data[i].comment}
                        {/* Maybe add a delete comment button
                            Would have to be conditional on user */}
                    </div>
                );
            }
            setAllComments(allComments);
        } catch {
            if (err) console.log('Error in getting comments');
        }
    })

    return (props.trigger) ? (
        <div>
            <div>
                <div>
                    <button onClick={() => props.setTrigger(false)}>X</button>
                </div>
                <div>
                    {props.questions} {/*pass down questions through dashboard to QuestionPopUp*/}
                </div>
                <div>
                    {allComments}
                </div>
            </div>
                <form onSubmit={addComment}>
                    <input 
                    type='text'
                    placeholder='Enter Comment'
                    onChange={(e) => setCommentBody(e.target.value)}
                    >
                    </input>
                    <button>Submit</button>   
                </form>
        </div>
    ) : '';
}