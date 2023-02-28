const express = require('express');
const router = express.Router()
const questionController = require('../controllers/questionController.js')
/**
 * INTERVIEW QUESTIONS ENDPOINTS
 */
//retrieve cohort's questions and send back to client
router.get('/getAll', questionController.getAllQuestions, (req,res) => {
  return res.status(200).json(res.locals.allQuestions);
});

//create a question
router.post('/add', questionController.createQuestion, (req,res) => {
  return res.status(200).json(res.locals.newQuestion);
});

// //upvote question
// router.post();

// //downvote question
// router.post();

// //delete question
// router.delete('/:_id', entryControllers.deleteBoard,(req, res) =>{
//     res.status(200).json(res.locals.deleteBoard);
//   });

module.exports = router;
