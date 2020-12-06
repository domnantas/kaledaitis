export const schema = gql`
  type User {
    id: String!
    name: String!
    sharedWith: [User]!
    takenFrom: [User]!
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    name: String!
  }

  input UpdateUserInput {
    name: String
  }
`
