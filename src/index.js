const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const { connect } = require('./db')
const {
  getSectionCourse,
  getSection,
  getCourse,
  getBook,
  getUser
} = require('./utils')

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

const typeDefs = gql`
  type Section {
    id: ID!
    course: Course
    professorId: Int
    students: [Person]
    people: [Person]
    time: String
  }
  type Person {
    id: ID!
    name: String!
    sections: [Section]
    type: String!
    officeHours: String
    house: House
  }

  enum House {
    gryffindor
    hufflepuff
    ravenclaw
    slytherin
  }

  type Course {
    id: ID!
    name: String!
    books: [Book]
  }
  type Book {
    id: ID!
    name: String!
    course: Course
  }

  type Query {
    greeting: String
    myCourses(id: ID!): [Course]
    myBooks(id: ID!): [Book]
    user(id: ID!): Person
  }
`

const resolvers = {
  Query: {
    greeting: () => 'hello',
    user: async (parent, args, ctx, _) => {
      if (!args.id) throw new Error('No ID provided')
      const peopleResp = await ctx.api.get(`/people/${args?.id}`)
      return peopleResp?.data
    },
    myCourses: async (parent, args, ctx, _) => {
      if (!args.id) throw new Error('No ID provided')
      const coursesToReturn = []
      const peopleResp = await ctx.api.get(`/people/${args.id}`)
      const { sections } = peopleResp?.data
      const courses = await Promise.all(
        sections?.map(async section => {
          const courseData = await getSectionCourse(ctx, section)
          return courseData?.data
        })
      )
      return coursesToReturn
    },
    myBooks: async (parent, args, ctx, _) => {
      if (!args.id) throw new Error('No ID Provided')
      const booksToReturn = []
      const peopleResp = await ctx.api.get(`/people/${args?.id}`).catch(err => {
        throw new Error('Failed to get user')
      })
    }
  },

  Person: {
    sections: async (parent, args, ctx, _) => {
      const parentSections = parent?.sections
      return await Promise.all(
        parentSections?.map(async section => {
          const sectionResp = await getSection(ctx, section)
          return sectionResp?.data
        })
      )
    }
  },
  Section: {
    course: async (parent, args, ctx, _) => {
      const courseResp = await getCourse(ctx, parent?.courseId)
      return courseResp?.data
    },
    students: async (parent, args, ctx, _) => {
      console.log('parent', parent)
      const parentPeople = parent.people
      const professorId = parent.professorId
      const students = parentPeople?.filter(id => id !== professorId)
      return await Promise.all(
        students?.map(async studentId => {
          const studentResp = await getUser(ctx, studentId)
          return studentResp?.data
        })
      )
    }
  },
  Course: {
    books: async (parent, args, ctx, _) => {
      const parentsBooks = parent.books
      return await Promise.all(
        parentsBooks?.map(async bookId => {
          const bookResp = await getBook(ctx, bookId)
          return bookResp?.data
        })
      )
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers, context: { api } })
const start = async () => {
  // TODO - DB connection
  // await connect()
  server.listen().then(({ url }) => console.log(`server running at ${url}`))
}

start()
