export const schema = gql`
  type User {
    id: String!
    name: String!
    sharedWith: [User]!
    takenFrom: [User]!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
  }

  input CreateUserInput {
    name: String!
  }

  input takeFromUserInput {
    id: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    takeFromUser(id: String!, input: takeFromUserInput): User!
    deleteUser(id: String!): User!
  }
`
