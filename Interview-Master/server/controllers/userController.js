const db  = require('../models/tableSql.js');
const bcrypt = require('bcrypt');
const WORKFACTOR = 15;


module.exports = {

  //bycript users
  getBcrypt : (req, res, next) => {
   
    const pass = req.body.password;
    bcrypt.hash(pass, WORKFACTOR)
        .then(hash => {
            req.body.password = hash;
            
            res.locals.user = req.body;
            
            return next();
        })
},
      //Get all users
  async getUsers (req,res,next){
    try{
    const text = 'SELECT * FROM Users;'
      const allUsers = db.query(text)
      res.locals.allUsers = allUsers;
        return next();
    }catch (error){
      console.log(error);
      return next({log: 'error in get all users controller'})
    }
  },
      //Signup new user
  async newUser (req, res,next){
     try{
      let { firstname, lastname, email, password, board_id } = req.body;

      const values = [ firstname, lastname, email, password, board_id ]
      const text = 'INSERT INTO users (firstname, lastname, email, password, board_id) VALUES($1,$2,$3,$4,$5) RETURNING *'
      const user = await db.query(text,values)
      //console.log(user)
      res.locals.user = user;
      return next();
    }catch(error){
     console.log(error);
      return next({log: 'error in signup controller'})
    }
  },
  //login  on user

  async getone (req,res, next){
    try {
      const {email, password} = req.body;
      //console.log(email)
      const text = `SELECT * FROM users WHERE email = $1`
      const values = [email];
  
      const response = await db.query(text, values)
      const dbpass = response.rows[0].password
      const verified = await bcrypt.compare(password, dbpass)
      if (verified){
        res.cookie('token', 'user');
        console.log('you are verified')
        // console.log(response.rows[0]);
        res.locals.one = response.rows[0];
        return next();
      }
      else{
        console.log('wrong password')
      }
    } catch (error) {
      console.log(error);
      return next({log: 'error in login'})
    }
  }
};