const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db='mongodb+srv://userdipak:passworddipak@eventsdb-3vbr6.mongodb.net/eventsdb?retryWrites=true&w=majority'

mongoose.connect(db, err => {
  if(err){
    console.log('Error!', err)
  }else{
    console.log('Connected to mongodb')
  }
})

function verifyToken(req, res, next){
  if(!req.headers.authorization){
    res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null'){
    res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload){
    res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

router.get('/', (req, res) => {
  res.send('From API router')
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = User(userData)
  user.save((error, registeredUser) => {
    if(error){
      console.log(error)
    }else{
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (error, user) => {
    if(error){
      console.log(error)
    }else{
      if(!user){
        res.status(401).send('Invalid email')
      }else if(user.password !== userData.password){
        res.status(401).send('Invalid password')
      }else{
        let payload = { subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]

  res.send(events)
})

router.get('/special', verifyToken, (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]

  res.send(events)
})

module.exports = router

