const db  = require('../models/tableSql.js');

const questionController = {};

// retrieve all questions
questionController.getAllQuestions = (req, res, next) => {
    // MAKE board_id DYNAMIC
    const { token } = req.cookies
    const text = `SELECT * FROM interviewquestion WHERE board_id = ${token}`;
    db.query(text)
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
  console.log(req.body)
  //console.log(req.cookie.token)
  // insert new question into database
  const values = [content, tags, company];
  const text = `INSERT INTO interviewquestion (content,tags,company) VALUES ($1, $2, $3) RETURNING *`
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
    const { _id } = req.body;
    const text = `UPDATE interviewquestion SET thumbs = thumbs + 1 WHERE _id = ${_id} RETURNING thumbs`;
    db.query(text)
      .then((data) => {
        console.log('upvote thumbs >>>', data)
        res.locals.numThumbs = data.rows[0];
        return next()
      })
      .catch((err) => {
        console.log(err);
        return next({log: 'error in upvoteQuestion controller'})
      })
    return next()
}

// downvote a quesition
questionController.downvoteQuestion = (req, res, next) => {

    return next()
}

module.exports = questionController;