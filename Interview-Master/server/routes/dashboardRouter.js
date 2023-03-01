const express = require('express');
const dashboardControllers = require('../controllers/dashController.js');
const router = express.Router();


//Create new Board
  //if creating new board it sends back the board's information
  //if board is already created it sends back the board_id they submitted
router.post('/main',dashboardControllers.getAllBoards, dashboardControllers.createBoard, (req,res) =>{
  const token = req.cookies.token;
  if(token === 'user'){

  return res.locals.AlreadyExists ? res.status(200).json(req.body.board_id) : res.status(200).json(res.locals.newBoard);
  }
  else{
    console.log('not a user')
  }
});




module.exports = router;