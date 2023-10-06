const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user')


const router = express.Router();
router.get('/getUser' , ( req, res) =>{
  const token = req.cookies?.token;
  if (token){
   jwt.verify(token, process.env.secret , {} ,(err , userData) =>{
      if (err) throw err;
      res.json(userData);
    });
  } else {
    return res.status(401).json('no token');
  }
   })

   router.get('/users', async (req, res) => {
      try {
        const users = await User.find(); // Retrieve all users from the database
        res.json(users); // Send the users as a JSON response
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

router.post ('/register' , async(req, res) => {
  try{
   const existingUser = await User.findOne({username: req.body.username});
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const existingEmail = await User.findOne({email: req.body.email});
    if (existingEmail) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password , 10);
    const user = await User.create({
        username :req.body.username,
        email : req.body.email,
        password : hashedPassword
  })
     jwt.sign({id: user._id, name:user.name,email:user.email },process.env.secret , {} , (err , token) => {
        if (err) throw err;
        res.cookie('token' , token).status(201).json({
         id: user._id,
         username: user.username
        })
     })
  }catch (err){
   console.error('Error:', err);
   return res.status(500).json({ status: 'error', error: 'An error occurred during Registration' });
  }
})

router.post('/login' , async(req, res) => {
   try{
      const userExist = await User.findOne({username: req.body.username});
      if(!userExist){
         return res.status(401).json({ error: 'Invalid username' });
      }
         const ispasswordValid = await bcrypt.compare(req.body.password , userExist.password)
      
      
     if (ispasswordValid){

      jwt.sign({ id: userExist._id, username: userExist.username }, process.env.secret, {}, (err, token) => {
         if (err) throw err;
         res.cookie('token', token).status(201).json({
           id: userExist._id,
           username: userExist.username,
         });
       });
       
   }else{
    return res.status(401).json({ error: 'Invalid password' });
   }
   }catch(err) {
      return res.status(500).json({ error: 'An error occurred during login' });
   }
})

module.exports = router;