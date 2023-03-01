const express = require ('express');
// import express from 'express';
const app = express();
const port = 3333;
const path = require('path');
// import path from 'path';

const userRouter = require('./routes/userRouter.js');
// import userRouter from './routes/userRouter.js';
const questionRouter = require('./routes/questionRouter.js');
// import questionRouter from './routes/questionRouter.js';
const dashboardRouter = require ('./routes/dashboardRouter.js')
// import dashboardRouter from './routes/dashboardRouter.js';


// account for incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client')));

/**
 * USER ENDPOINTS
 */

app.use('/user', userRouter);


// /**
//  * DASHBOARD ENDPOINTS
//  */

app.use('/dashboard', dashboardRouter);


// /**
//  * INTERVIEW QUESTIONS ENDPOINTS
//  */

app.use('/question', questionRouter);



// handle unknown routes
app.use((req, res) => res.status(404).send('This page does not exist'));

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send({ error: err });
  });

app.listen(port, function(){
  console.log(`Server on ${port}`);
});