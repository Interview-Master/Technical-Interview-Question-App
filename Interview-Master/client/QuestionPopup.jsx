import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const QuestionPopup = (props) => {

    const [ comment, setCommentBody ] = useState('');
    const [ allComments, setAllComments ] = useState('');
    const [ count, setCount ] = useState(0)

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/question/postComment', { //backend route
                comment,
                questionID: props._id,
            })
            if (response.status === 200) {
                setCommentBody('')
            }
        }
        catch (err) {
            console.log('error', err);
        }
    }

    useEffect(() => {

        setTimeout(()=> {
            setCount(count =>  count + 1)
        }, 1000);

            
                axios.post('/api/question/comments', {
                    questionID: props._id
                })
                    .then(data => {
                        const allCommentsOnQ = [];
                        for (let i = 0; i < data.data.length; i++) {
                            console.log('Comment >>>>>> ', data.data[i].comment);
                        allComments.push(
                            <div key={i}>
                                {data.data[i].comment}
                                {/* Maybe add a delete comment button
                                Would have to be conditional on user */}
                            </div>
                    )
                    .catch(err => console.log('Error in getting comments: ', err))
            }
            setAllComments(allCommentsOnQ);
                }) //waitfor backend route for comments
            
    }, [])

    return (props.trigger) ? (
        <div>
            <div className='fixed top-1/4 inset-x-0 mx-auto h-1/2 w-1/2 bg-purple-200 bg-opacity-95 rounded-xl'>
                <div className='flex justify-end pr-3 pt-3 text-xl text-semibold'>
                    <button onClick={() => props.setTrigger(false)}>X</button>
                </div>
                <div>
                    {props.questions} {/*pass down questions through dashboard to QuestionPopUp*/}
                </div>
                <div>
                    {allComments}
                </div>
                <form 
                    className='flex flex-col items-center justify-center text-2xl text-semibold'
                    onSubmit={addComment}>
                    <textarea 
                    className='flex m-5 max-w-none w-3/4 focus:ring-purple-500 focus:border-purple-500'
                    type='text'
                    rows='4'
                    placeholder='Enter comment'
                    onChange={(e) => setCommentBody(e.target.value)}
                    >
                    </textarea>
                    <button 
                        className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Post comment!
                        </span>
                </button>      
                </form>
            </div>
        </div>
    ) : '';
}