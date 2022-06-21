const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'})

//CONNECT DB
connectDB();

//SERVER
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        //console.log(req.headers)

        const token = req.headers['authorization'] || "";
        
        if(token){
            try {
                const userVerify = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
                //console.log(userVerify);
                return {
                    userVerify
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
});

//LISTEN PORT
server.listen().then( ({url})=> {
    console.log(`Server listen in ${url}`)
})