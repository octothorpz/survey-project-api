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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Survey', surveySchema)
