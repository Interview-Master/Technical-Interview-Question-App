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

//upvote question
router.post('/upvote', questionController.upvoteQuestion, (req, res) => {
  return res.status(200).json(res.locals.numThumbs);
});

//get different cohort
router.get('/:id', questionController.getdifferentCohort, (req,res) => {
  return res.status(200).json(res.locals.different);
});

//get comments for question
router.post('/comments', questionController.getComments, (req, res) => {
  return res.status(200).json(res.locals.comments);
});

//post new comment
router.post('/postComment', questionController.postComment, (req, res) => {
  return res.status(200).json(res.locals.newComment);
});

// //downvote question
// router.post();

// //delete question
// router.delete('/:_id', entryControllers.deleteBoard,(req, res) =>{
//     res.status(200).json(res.locals.deleteBoard);
//   });

module.exports = router;
