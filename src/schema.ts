import { gql } from 'apollo-server'

interface User {
  id: number
  name: string
  companyId?: number
  age: number
  isAdmin: boolean
}

const users: { [id: string]: User } = {
  1: {
    id: 1,
    name: 'Alice',
    companyId: 2,
    age: 445,
    isAdmin: false
  },
  2: {
    id: 2,
    name: 'Bob',
    companyId: 1,
    age: 556,
    isAdmin: true
  },
  3: {
    id: 3,
    name: 'Perry',
    age: 333,
    isAdmin: false
  },
  4: {
    id: 4,
    name: 'Charles',
    age: 12,
    isAdmin: true,
    companyId: 3
  }
}

const typeDefs = gql`
  type Query {
    user(id: Int!): User
    users: [User]
  }

  type User {
    id: Int!
    name: String!
    companyId: Int
    age: Int!
    isAdmin: Boolean!
  }
`

const resolvers = {
  Query: {
    user: (_: any, params: any) => users[params.id],
    users: (_: any) => Object.values(users)
  }
}

export default {
  typeDefs,
  resolvers
}
