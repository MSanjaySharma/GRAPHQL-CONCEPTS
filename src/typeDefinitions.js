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
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        blogs: [Blog!]!
    }

    type Blog {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`;
