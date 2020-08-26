// Types in GraphQL =>
// Scalar types - String, Boolean, Int, Float, ID

//type definitions (application schema)
export const typeDefs = `
    type Query {
        greeting(name: String, company: String): String!
        add(a: Float!, b: Float!): Float!
        addArray(nums: [Float!]!): Float!
        grades: [Int!]!
        userDetails: User!
        users(search: String): [User!]!
        blogDetails: Blog!
        blogs(search: String): [Blog!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createBlog(title: String!, body: String!, published: Boolean!, author: ID!): Blog!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        blogs: [Blog!]!
        comments: [Comment!]!
    }

    type Blog {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        blog: Blog!
    }
`;
