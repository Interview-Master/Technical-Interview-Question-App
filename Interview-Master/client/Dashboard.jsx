import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { QuestionPopup } from './QuestionPopup.jsx';
import { AddQuestion } from './AddQuestion.jsx';

export const Dashboard = () => {

const [ buttonPopup, setButtonPopup ] = useState(false);
const [ addQuestion, setAddQuestion ] = useState(false);
const [ thumbs, setThumbs ] = useState(0);
const [ allQuestions, setAllQuestions ] = useState([]); //try empty array

const thumbsUp = () => {
    setThumbs(thumbs + 1)
}

useEffect(() => {
      axios.get('/api/question/getAll').then(data => {
        console.log(data.data[0]);
      const questions = [];
      for (let i = 0; i < data.data.length; i++) {
          questions.push(
          <div key={i}>
              <div>
                  <div>{data.data[i].content}</div>
                  <button onClick={() => setButtonPopup(true)}>
                      +
                  </button>
                  <QuestionPopup 
                      trigger={buttonPopup} 
                      setTrigger={setButtonPopup} 
                      questions={questions} 
                      _id={data.data[i]._id}>
                  </QuestionPopup>
              </div>
              <div>
                  {setThumbs(data.data[i].thumbs)}
                  <button onClick={thumbsUp}>
                      Thumbs up!!
                      {/* add thumbs image for replacement */}
                  </button>
                  {/* {thumbs} */}
              </div>
          </div>
          );
          }
          console.log(questions);
      setAllQuestions(questions);
    }); //does it need to be async?
        
    // getQuestions();
}, []);

    return (
        <div className='flex flex-col items-center justify-center h-4 w-screen'>
            <div>
                <button onClick={() => setAddQuestion(true)}></button>
                <AddQuestion
                        trigger={addQuestion} 
                        setTrigger={setAddQuestion} 
                        > Add Interview Question 
                </AddQuestion>    
            </div>
            <div>
              {allQuestions}
            </div>
        </div>
    )
}