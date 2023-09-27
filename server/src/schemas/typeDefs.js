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

type Query {
    users:[User]
    user(id:ID!):User
}

type Mutation {
    createUser(user:addUserInput!):User
    updateUserAvatar(id:ID!, avatarImage:Upload!):User
    updateUsername(id:ID!,username:String!):User
    updateEmail(id:ID!,email:String!):User
    updatePassword(id:ID!,oldPass:String!,newPass:String!):User
    deleteUser(id:ID!,password:String!):Boolean
}
`;
