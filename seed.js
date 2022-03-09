const mongoose = require('mongoose')
const { connect } = require('./src/db')
const { Book } = require('./src/models/book')
const bookData = [
  {
    name: 'The Way of Kings'
  },
  {
    name: 'Words of Radiance'
  },
  {
    name: 'Oathbringer'
  }
]

let db

const main = async () => {
  await connect()
  const newBooks = await createBooks()
  console.log('newbooks', newBooks)
  console.log('books created')
}

const createBooks = async () => {
  return Promise.all(
    bookData.map(async book => {
      return await Book.create(book)
    })
  )
}

main().then(() => {
  process.exit(0)
})
