const mongoose = require('mongoose')
const { Schema } = require('../db')

const BookSchema = new Schema({
  name: {
    type: String
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'CourseSchema',
    default: null
  }
})

exports.Book = mongoose.model('Book', BookSchema)
