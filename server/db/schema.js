const { gql } = require('apollo-server');

//SCHEMA (type definitions)
const typeDefs = gql`

#### TYPES ####

    #USER
    type User {
        id: ID
        name: String
        lastName: String
        email: String
        dataCreate: String
    }

    type Token {
        token: String
    }

    #PRODUCT
    type Product {
        id: ID
        name: String
        stock: Int
        price: Float
        dataCreate: String
    }

    #CLIENT
    type Client {
        id: ID
        name: String
        lastName: String
        company: String
        email: String
        phone: String
        seller: ID
        dataCreate: String
    }

    #ORDER
    type Order {
        id: ID
        order: [OrderGroup]
        total: Float
        client: Client
        seller: ID
        state: StateOrder
        dataCreate: String
    }

    type OrderGroup {
        id: ID
        quantity: Int
        name: String
        price: Float
    }

    #ADVANCED SEARCHES 
    type TopClient {
        total: Float
        client: [Client]
    }

    type TopSeller {
        total: Float
        seller: [User]
    }

#### INPUTS ####

    #USER
    input UserInput {
        name: String!
        lastName: String!
        email: String!
        password: String!
    }

    input AutenticaInput {
        email: String!
        password: String!
    }

    #PRODUCT
    input ProductInput {
        name: String!
        stock: Int!
        price: Float!
    }

    #CLIENT
    input ClientInput {
        name: String!
        lastName: String!
        company: String!
        email: String!
        phone: String
    }

    #ORDER
    input OrderInput{
        order: [orderProductInput]
        total: Float
        client: ID
        state: StateOrder
    }

    input orderProductInput {
        id: ID
        quantity: Int
        name: String
        price: Float
    }

    enum StateOrder {
        PENDING
        COMPLETE
        CANCELLED
    }

#### QUERYS ####

    type Query {

        #USERS
        getUserAutenticate: User

        #PRODUCTS
        getProducts : [Product]
        getProductById(id: ID!): Product

        #CLIENT
        getClients: [Client]
        getClientBySeller: [Client]
        getClientById(id: ID!): Client

        #ORDER
        getOrders: [Order]
        getOrderBySeller: [Order]
        getOrderById(id: ID!): Order
        getOrderByState(state: String!): [Order]

        #ADVANCED SEARCHES 
        topClients: [TopClient]
        topSellers: [TopSeller]
        getProductByName(text: String!): [Product]
    }

#### MUTATIONS ####

    type Mutation {

        #USERS
        newUser(input: UserInput) : User
        autenticationUser(input: AutenticaInput) : Token

        #PRODUCTS
        newProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!): String

        #CLIENT
        newClient(input: ClientInput) : Client
        updateClient(id: ID!, input: ClientInput): Client
        deleteClient(id: ID!): String

        #ORDER
        newOrder(input: OrderInput): Order
        updateOrder(id: ID!, input: OrderInput): Order
        deleteOrder(id: ID!): String
    }
`;

module.exports = typeDefs;