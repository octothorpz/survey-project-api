'use strict'

const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a survey question']
  },
  option1: {
    type: String,
    required: [true, 'You must provide at least 2 options']
  },
  option2: {
    type: String,
    required: [true, 'You must provide at least 2 options']
  },
  option3: {
    type: String
  },
  option4: {
    type: String
  },
  option5: {
    type: String
  },
  timestamps: true
})

const Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey
