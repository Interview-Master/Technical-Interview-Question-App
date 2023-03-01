const db  = require('../models/tableSql.js');

const dashboardController = {};

/**
* createBoard - create a board in the db if one does not already exist
*/
dashboardController.createBoard = (req, res, next) => {
    const text = `INSERT INTO GroupDash (board_id) VALUES ($1) RETURNING *`
    const values = [req.body.board_id];

    if(res.locals.AlreadyExists) return next();

    db.query(text, values)
        .then(data => {
            res.locals.newBoard = data.rows[0];
            console.log('New board >>>> ', data.rows[0]);
            return next();
        })
        .catch(err => {
            return next({log: 'error in createBoard controller'});
        })
}

dashboardController.getAllBoards = (req, res, next) => {
    const text = 'SELECT board_id FROM GroupDash';

    db.query(text)
        .then(data => {
            for(let i = 0; i < data.rows.length; i++){
                if(data.rows[i].board_id === req.body.board_id){
                    console.log(data.rows[i].board_id, req.body.board_id);
                    res.locals.AlreadyExists = true;
                    return next();
                }
            }
            return next();
        })
        .catch(err => {
            return next(err);
        })
}

module.exports = dashboardController;