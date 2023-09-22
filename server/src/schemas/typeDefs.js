export const typeDefs = `#graphql
type User {
    username:String!
    email:String!
    id:String!
    roles:[String!]!
    avatarPath:String!
}

input addUserInput {
    username:String!
    email:String!
    password:String!
}

type Query {
    users:[User]
    user(id:ID!):User
}

type Mutation {
    createUser(user:addUserInput!):User
}
`;
