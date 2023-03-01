const express = require('express');
// import express from 'express';
const router = express.Router()
const userController = require ('../controllers/userController.js')
/**
 * USER ENDPOINTS
 */



//login user
 router.post('/login', userController.getone, (req,res)=>{
  return res.status(200).json(res.locals.one);
 });

//Get all users
router.get('/all', userController.getUsers, (req, res) =>{
  return res.status(200).json(res.locals.allUsers);
});

//sign up user
router.post('/signup', userController.newUser, (req, res) => {
  return res.status(201).json(res.locals.user);
})

module.exports = router;