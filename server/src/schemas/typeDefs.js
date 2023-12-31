export const typeDefs = `#graphql
scalar Upload

type User {
    username:String!
    email:String!
    id:String!
    roles:[String!]!
    avatarPath:String!
    songs:[Song]!
}

input addUserInput {
    username:String!
    email:String!
    password:String!
    password2:String!
}

type Source {
    title:String
    singer:String
}

type Song {
    id:ID!
    title:String!
    singer:String!
    songPath:String!
    isCover:Boolean!
    source:Source
    lyrics:String!
    reproductions:Int!
    favorites:Int!
    likes:Int!
    dislikes:Int!
    tags:[String!]!
}

input addSongInput {
    title:String!
    singer:String!
    isCover:Boolean!
    sourceTitle:String
    sourceSinger:String
    lyrics:String!
    tags:[String!]!
}

type Token {
  value: String!
}

type Query {
    users:[User]
    user(id:ID!):User
    songs:[Song]
    song(id:ID!):Song
}

enum MoreOrLess {
    MORE
    LESS
}

type Mutation {
    createUser(user:addUserInput!):User
    updateUserAvatar(avatarImage:Upload!):User
    updateUsername(username:String!):User
    updateEmail(email:String!):User
    updatePassword(oldPass:String!, newPass:String!):User
    deleteUser(password:String!):Boolean

    login(username:String!, password:String!):Token

    addSong(song:addSongInput!, songFile:Upload!):Song
    updateSongTitle(id:ID!, title:String!):Song
    updateSongSinger(id:ID!, singer:String!):Song
    updateSongLyrics(id:ID!, lyrics:String!):Song
    updateSongTags(id:ID!, tags:[String!]!):Song
    updateSongFile(id:ID!, songFile:Upload!):Song
    updateIsCover(id:ID!, isCover:Boolean!, sourceTitle:String, sourceSinger:String):Song
    updateSongSourceTitle(id:ID!, sourceTitle:String!):Song
    updateSongSourceSinger(id:ID!, sourceSinger:String!):Song
    updateSongReproductions(id:ID!):Song
    updateSongFavorites(id:ID!, moreOrLess:MoreOrLess!):Song
    updateSongLikes(id:ID!, moreOrLess:MoreOrLess!):Song
    updateSongDislikes(id:ID!, moreOrLess:MoreOrLess!):Song
    deleteSong(id:ID!, password:String!):Boolean
}
`;
