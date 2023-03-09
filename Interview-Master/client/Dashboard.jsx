import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { QuestionPopup } from './QuestionPopup.jsx';
import { AddQuestion } from './AddQuestion.jsx';

export const Dashboard = (props) => {

const [ buttonPopup, setButtonPopup ] = useState(false); 
const [ addQuestion, setAddQuestion ] = useState(false);
const [ thumbs, setThumbs ] = useState('');
const [ allQuestions, setAllQuestions ] = useState(''); 
const [ count, setCount ] = useState(0)

const thumbsUp = (id) => {
    setThumbs(thumbs + 1);
    axios.post('/api/question/upvote', {
        questionID: id
    })
      .then((res) => {
        // setRefresh(true);
        console.log(`Question ${id} upvoted`);
      })
      .catch((err) => {
        console.log(`Error upvoting question ${id}: ${err}`);
      });;
}
let route = '/api/question/getAll'
console.log(route)
useEffect((props) => {
    // if (resfresh) {window.location.reload()}
    setTimeout(()=> {
        setCount(count =>  count + 1)
    }, 1000);
      axios.get(route).then(data => {
        console.log(data.data[0]);
      const questions = [];
      for (let i = 0; i < data.data.length; i++) {
          questions.push(
          <div className='flex flex-col m-5 border-solid border-2 border-slate-500 w-10/12 rounded-md p-2' key={i}>
                <div className='flex justify-between'>
                  <div className='flex left-0 text-xl text-gray-900'>{data.data[i].content}</div>
                    <div>
                        <button 
                        className='flex justify-right bg-tertiary-500 w-6 p-3 rounded-lg text-green-600 text-xl -mt-1 cursor-pointer text-lg'
                        onClick={() => setButtonPopup(true)}>+</button>
                        <QuestionPopup 
                            trigger={buttonPopup} 
                            setTrigger={setButtonPopup} 
                            content={data.data[i].content}
                            >
                        </QuestionPopup>
                     </div>
                   </div>
                 <div className='flex justify-between'>
              <div className=''>
                Company: {data.data[i].company}
              </div>
              <div className='left-0 text-sm text-gray-900 justify-self-center self-center'>{data.data[i].name}</div>
              <div className=''>
                  {setThumbs(data.data[i].thumbs)}
                    <button                       
                      id={data.data[i]._id}
                      onClick={() => thumbsUp(data.data[i]._id)}>
                  <svg className= "bi bi-hand-thumbs-up-fill fill-white stroke-violet-800 stroke-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                  </svg> 
                  </button>
                  {data.data[i].thumbs}
              </div>
            </div>
          </div>
          );
          }
      setAllQuestions(questions);
    }); 
}, [count]);

    return (
        <div className='flex flex-col items-center justify-center h-screen w-screen'>
            <div className='text-lg flex justify-center items-center'>
                <button 
                    className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'
                    onClick={() => setAddQuestion(true)}>
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Add Interview Question
                        </span>
                </button>
                <AddQuestion
                        trigger={addQuestion} 
                        setTrigger={setAddQuestion} 
                        > 
                </AddQuestion> 
            </div>
            <div className='w-11/12 h-4/6 flex flex-col items-center shadow-lg overflow-y-auto'>
              {allQuestions}
            </div>
        </div>
    )
}