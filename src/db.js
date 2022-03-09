const mongoose = require('mongoose')

const connect = () =>
  mongoose.connect('mongodb://localhost:27017/hogwarts', {
    useNewUrlParser: true
  })

const disconnect = () => {
  mongoose.disconnect()
}
exports.Schema = mongoose.Schema
exports.connect = connect
exports.disconnect = disconnect
