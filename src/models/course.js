const mongoose = require('mongoose')
const { Schema } = require('../db')

export const CourseSchema = new Schema({
  name: {
    type: String
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BookSchema'
    }
  ]
})

exports.Course = mongoose.model('Course', CourseSchema)
