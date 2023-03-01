const db  = require('../models/tableSql.js');

const questionController = {};

// retrieve all questions
questionController.getAllQuestions = (req, res, next) => {
    const text = 'SELECT * FROM interviewquestion'
    db.query(text)
      .then((data) => {
        // console.log(data.rows);
        res.locals.allQuestions = data;
        return next();
      })
      .catch((err) => {
        // console.log('error in getAllQuestions controller', err);
        return next({log: 'error in getAllQuestions controller'})
      })
}

// create a new question
questionController.createQuestion = (req, res, next) => {
  // destructure req.body
  const { content, thumbs, tags, company } = req.body;
  console.log(req.body)
  // insert new question into database
  const values = [content, thumbs, tags, company];
  const text = `INSERT INTO interviewquestion (content,thumbs,tags,company) VALUES ($1, $2, $3, $4) RETURNING *`
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

    return next()
}

// upvote a question
questionController.upvoteQuestion = (req, res, next) => {

    return next()
}

// downvote a quesition
questionController.downvoteQuestion = (req, res, next) => {

    return next()
}

module.exports = questionController;