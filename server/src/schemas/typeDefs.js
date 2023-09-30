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

type Source {
    title:String!
    singer:String!
}

input addSongInput {
    title:String!
    singer:String!
    song:Upload!
    isCover:Boolean!
    source:Source
    lyrics:String
    tags:[String!]!
}

input Song {
    title:String!
    singer:String!
    song:Upload!
    isCover:Boolean!
    source:Source
    lyrics:String
    reproductions:Int!
    favorites:Int!
    likes:Int!
    dislikes:Int!
    tags:[String!]!
}

type Token {
  value: String!
}

type Query {
    users:[User]
    user(id:ID!):User
    songs:[Song]
    song:(id:ID!):Song
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
