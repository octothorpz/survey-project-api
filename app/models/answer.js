'use strict'

const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  surveyTaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  answer: {
    type: String,
    required: [true, 'Please select an answer before submitting']
  }
})

module.exports = mongoose.model('Answer', answerSchema)
