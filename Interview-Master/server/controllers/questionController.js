const db  = require('../models/tableSql.js');

const questionController = {};

// retrieve all questions
questionController.getAllQuestions = (req, res, next) => {
    const { cohort } = req.cookies
    value = [cohort]
    const text = `SELECT * FROM interviewquestion WHERE board_id = $1 ORDER BY thumbs DESC`;
    db.query(text, value)
      .then((data) => {
        console.log('getAllQuestions >>>> ', data.rows);
        res.locals.allQuestions = data.rows;
        return next();
      })
      .catch((err) => {
        return next({ log: 'error in getAllQuestions controller' }, err);
      })
}

// create a new question
questionController.createQuestion = (req, res, next) => {
  // destructure req.body
  const { content, tags, company } = req.body;
  const { cohort , name } = req.cookies
  console.log(req.body)
  // insert new question into database
  const values = [content, tags, company, cohort, name];
  const text = `INSERT INTO interviewquestion (content, tags, company, board_id, name) VALUES ($1, $2, $3, $4, $5) RETURNING *`
  db.query(text, values)
    .then((data) => {
      res.locals.newQuestion = data.rows[0];
      console.log('new question >>>', data.rows[0]);
      return next();
    })
    .catch((err) => {
      console.log(err)
      return next({ log: 'error in createQuestion controller' });
    })
}

// delete a question
questionController.deleteQuestion = (req, res, next) => {
  // target the current user's board id table
  // select a question by its _id
    return next()
}

// upvote a question
questionController.upvoteQuestion = (req, res, next) => {
    // target a question by its _id
    const { questionID } = req.body;
    console.log("questionID >>>", questionID)
    const value = [questionID]
    const text = `UPDATE interviewquestion SET thumbs = thumbs + 1 WHERE _id = $1 RETURNING thumbs`;
    db.query(text,value)
      .then((data) => {
        console.log('upvote thumbs >>>', data.rows[0].thumbs);
        res.locals.numThumbs = data.rows[0].thumbs;
        return next();
      })
      .catch((err) => {
        //console.log(err);
        return next({ log: 'error in upvoteQuestion controller' })
      })
}

//get questions from other cohort
questionController.getdifferentCohort = (req, res, next) => {
  // MAKE board_id DYNAMIC
  const cohort = req.params.id;
  value = [cohort]
  console.log(value)
  const text = `SELECT * FROM interviewquestion WHERE board_id = $1`;
  db.query(text, value)
    .then((data) => {
      console.log('getAllQuestions >>>> ', data.rows);
      res.locals.different = data.rows;
      return next();
    })
    .catch((err) => {
      return next({ log: 'error in getAllQuestions controller' }, err);
    })
}

// get all comments
questionController.getComments = (req, res, next) => {
  // destructure req.body
  const { questionID } = req.body;
  // const { cohort , name } = req.cookies
  // console.log(req.body);
  // insert new question into database
  const values = [questionID];
  const text = `SELECT * FROM comments WHERE interview_id = $1`
  db.query(text, values)
    .then((data) => {
      res.locals.comments = data.rows;
      return next();
    })
    .catch((err) => {
      console.log(err)
      return next({ log: 'error in getComments controller' });
    })
}

// add new comment
questionController.postComment = (req, res, next) => {
  // destructure req.body
  const { comment, questionID } = req.body;
  console.log("comment >>", comment);
  console.log("questionID >>", questionID);
  // const { cohort , name } = req.cookies
  // console.log(req.body);
  // insert new question into database
  const values = [comment, questionID];
  const text = `INSERT INTO comments (commentBody, interview_id) VALUES ($1, $2) RETURNING *`
  db.query(text, values)
    .then((data) => {
      res.locals.newComment = data.rows[0];
      console.log('post comments >>>', data.rows[0]);
      return next();
    })
    .catch((err) => {
      console.log(err)
      return next({ log: 'error in postComment controller' });
    })
}

module.exports = questionController;