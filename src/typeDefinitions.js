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
        createUser(data: createUserInput): User!
        deleteUser(id: ID!): User!
        createBlog(data: createBlogInput): Blog!
        createComment(data: createCommentInput): Comment!
    }

    input createUserInput {
        name: String!
        email: String!
        age: Int
    }

    input createBlogInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input createCommentInput {
        text: String!
        author: ID!
        blog: ID!
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
