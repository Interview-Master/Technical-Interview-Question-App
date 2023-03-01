import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { QuestionPopup } from './QuestionPopup.jsx';
import { AddQuestion } from './AddQuestion.jsx';

export const Dashboard = () => {

const [ buttonPopup, setButtonPopup ] = useState(false);
const [ addQuestion, setAddQuestion ] = useState(false);
const [ thumbs, setThumbs ] = useState(0);
const [ allQuestions, setAllQuestions ] = useState(''); //try empty array

const thumbsUp = () => {
    setThumbs(thumbs + 1)
}
   
useEffect(() => {
    const getQuestions = async () => {
        const response = await axios.get('/api/question/getAll');
    }
    getQuestions();
    const questions = [];

    for (let i = 0; i < response.data.length; i++) {
        questions.push(
        <div>
            <div>
                <div>{response.data[i].problem}</div>
                <button onClick={() => setButtonPopup(true)}>
                    +
                </button>
                <QuestionPopup 
                    trigger={buttonPopup} 
                    setTrigger={setButtonPopup} 
                    questions={questions} 
                    _id={item._id}>
                </QuestionPopup>
            </div>
            <div>
                {setThumbs(response.data[i].thumbs)}
                <button onClick={thumbsUp}>
                    Thumbs up!!
                    {/* add thumbs image for replacement */}
                </button>
                {thumbs}
            </div>
        </div>
        );
        }
        setAllQuestions(questions);
}, []);

    return (
        <div className='flex flex-col items-center justify-center h-4 w-screen'>
            Hello
            <div>
                <button onClick={setAddQuestion(true)}>
                    <AddQuestion
                        trigger={addQuestion} 
                        setTrigger={setAddQuestion} 
                        > Add Interview Question {/*Lbabeling?*/}
                    </AddQuestion>    
                </button>
            </div>
            {allQuestions}
        </div>
    )
}