export const typeDefs = `#graphql
scalar Upload

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
    password2:String!
}

type Token {
  value: String!
}

type Query {
    users:[User]
    user(id:ID!):User
}

type Mutation {
    createUser(user:addUserInput!):User
    updateUserAvatar(userId:ID!, avatarImage:Upload!):User
    updateUsername(userId:ID!,username:String!):User
    updateEmail(userId:ID!,email:String!):User
    updatePassword(userId:ID!,oldPass:String!,newPass:String!):User
    deleteUser(userId:ID!,password:String!):Boolean
    login(username:String!,password:String!):Token
}
`;
