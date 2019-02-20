const express = require('express')
const passport = require('passport')
const Answer = require('../models/answer')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX - GET ALL ANSWERS
// GET /answers
router.get('/answers', requireToken, (req, res, next) => {
  Answer.find()
    .then(answers => {
      // `answers` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return answers.map(answer => answer.toObject())
    })
    // respond with status 200 and JSON of the answers
    .then(answers => res.status(200).json({ answers: answers }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE AN ANSWER
// POST /answers
router.post('/answers', requireToken, (req, res, next) => {
  // set owner of new answer to be current user
  req.body.surveyTaker = req.user.id
  Answer.find({surveyTaker: req.user.id, survey: req.body.survey})
    .then(answers => {
      if (answers.length > 0) {
        res.status(400).json({errors: 'You have already taken this survey'})
      } else {
        Answer.create(req.body)
          // respond to succesful `create` with status 201 and JSON of new "answer"
          .then(answer => {
            res.status(201).json({answer: answer.toObject()})
          })
          // if an error occurs, pass it off to our error handler
          // the error handler needs the error message and the `res` object so that it
          // can send an error message back to the client
          .catch(next)
      }
    })
})

module.exports = router
