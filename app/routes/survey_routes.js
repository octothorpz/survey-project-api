// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for surveys
const Survey = require('../models/survey')
const Answer = require('../models/answer')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { survey: { title: '', text: 'foo' } } -> { survey: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// Compute the survey stats in the form:
// {option1: 0.3, option2: 0.2, option3: 0.4, option4: 0.1, option5: 0}
const computeSurveyStats = (survey) => {
  // find all the answers for this survey
  return Answer.find({survey: survey.id})
    .then(answerModels => {
      const answerCounts = {}
      // will end up with {'pizza': 5, 'hot dog': 3, 'ice cream': 10}
      // for favorite food survey
      // e.g. pizza, pizza, hot dog, ice cream, pizza, hot dog, ice cream, ice cream
      for (const answerModel of answerModels) {
        const answer = answerModel.answer // 'pizza'
        // if answerModel.answer == 'pizza' && stats['pizza'] == null,
        // then set stats['pizza'] = 1
        // otherwise, if we've seen 'pizza' before, increment our 'pizza' count
        if (answerCounts[answer] == null) {
          answerCounts[answer] = 1
        } else {
          answerCounts[answer]++
        }
      }
      const numAnswers = answerModels.length
      const surveyStats = {}
      surveyStats[survey.option1] = 0
      surveyStats[survey.option2] = 0
      if (survey.option3) surveyStats[survey.option3] = 0
      if (survey.option4) surveyStats[survey.option4] = 0
      if (survey.option5) surveyStats[survey.option5] = 0
      for (const answer in answerCounts) {
        surveyStats[answer] = answerCounts[answer] / numAnswers
      }
      return surveyStats
    })
}

// INDEX
// GET /surveys
router.get('/surveys', requireToken, (req, res, next) => {
  Survey.find()
    .then(surveys => {
      // `surveys` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return surveys.map(survey => survey.toObject())
    })
    // respond with status 200 and JSON of the surveys
    .then(surveys => res.status(200).json({ surveys: surveys }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /surveys/5a7db6c74d55bc51bdf39793
router.get('/surveys/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Survey.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "survey" JSON
    .then(survey => res.status(200).json({ survey: survey.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW STATS
// GET /surveys/5a7db6c74d55bc51bdf39793/stats
router.get('/surveys/:id/stats', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Survey.findById(req.params.id)
    .then(handle404)
    .then(survey => computeSurveyStats(survey))
    // if `findById` is succesful, respond with 200 and "stats" JSON
    .then(stats => res.status(200).json(stats))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /surveys
router.post('/surveys', requireToken, (req, res, next) => {
  // set owner of new survey to be current user
  req.body.survey.owner = req.user.id
  Survey.create(req.body.survey)
    // respond to succesful `create` with status 201 and JSON of new "survey"
    .then(survey => {
      res.status(201).json({ survey: survey.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /surveys/5a7db6c74d55bc51bdf39793
router.patch('/surveys/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.survey.owner

  Survey.findById(req.params.id).exec()
    .then(handle404)
    .then(survey => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, survey)
      // loop through the survey object sent in request
      for (const key in req.body.survey) {
        // set new values
        survey[key] = req.body.survey[key]
      }
      return survey.save()
    })
    // if that succeeded, return 200 and the updated survey
    .then(survey => res.status(200).json({ survey: survey.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /surveys/5a7db6c74d55bc51bdf39793
router.delete('/surveys/:id', requireToken, (req, res, next) => {
  Survey.findById(req.params.id)
    .then(handle404)
    .then(survey => {
      // throw an error if current user doesn't own `survey`
      requireOwnership(req, survey)
      // delete the survey ONLY IF the above didn't throw
      survey.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
