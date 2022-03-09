const mongoose = require('mongoose')
const { Schema } = require('../db')

export const SectionSchema = new Schema({
  name: {
    type: String
  },
  people: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PersonSchema'
    }
  ],
  course: {
    type: Schema.Types.ObjectId,
    ref: 'CourseSchema'
  },
  time: {
    type: String
  }
})

exports.Section = mongoose.model('Section', SectionSchema)
