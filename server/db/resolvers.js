const User = require('../models/User');
const Product = require('../models/Product');
const Client = require('../models/Client');
const Order = require('../models/Order');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'})

//FUNCTION CREATE TOKEN
const createToken = (user, secret, expiresIn) => {
    //console.log(user);
    const { id, name, lastName, email } = user;
    return jwt.sign({id, name, lastName, email}, secret, { expiresIn })
}

//RESOLVERS
const resolvers = {
    Query: {
        //USERS
        getUserAutenticate: async (_, {}, ctx) => {
            return ctx.userVerify

            //CODE RECICLE
            // const userId = await jwt.verify(token, process.env.SECRET)
            // return userId
        },

        //PRODUCT: GET ALL PRODUCTS
        getProducts: async () => {
            try {
                //ALL PRODUCTS
                const products = await Product.find({});
                return products
                
            } catch (error) {
                console.log(error)
            }
        },
        //PRODUCT: GET PRODUCT BY ID
        getProductById: async (_, {id}) => {
            //Product exist
            const product = await Product.findById(id);
            if(!product){
                throw new Error("This product doesn't exist")
            }
            return product  
        },
        //CLIENT: GET ALL CLIENTS
        getClients: async () => {
            try {
                //All Clients
                const clients = await Client.find({})
                return clients

            } catch (error) {
                console.log(error)
            }
        },
        //CLIENT: GET CLIENT BY SELLER
        getClientBySeller: async(_, {}, ctx) => {
            try {
                //Get Clients by seller
                const clients = await Client.find({seller: ctx.userVerify.id.toString()})
                return clients
            } catch (error) {
                console.log(error)
            }
        },
        //CLIENT: GET CLIENT BY ID
        getClientById: async (_, {id}, ctx) => {

            //Client exist
            const client = await Client.findById(id);
             if(!client){
                throw new Error ("This client doesn't exist")
             }

             //The client can only be seen by the seller who created it 
             if(client.seller.toString() !== ctx.userVerify.id){
                throw new Error ("You don't have the credentials to see this client")
             }

            try {
                return client
            } catch (error) {
               console.log(error) 
            }
        },
        //ORDER: GET ALL ORDERS
        getOrders: async () => {
            try {
                const orders = await Order.find({})
                return orders
                
            } catch (error) {
                console.log(error)
            }
        },
        //ORDER: GET ORDER BY SELLER
        getOrderBySeller: async (_, {}, ctx) => {
            try {
                const orders = await Order.find({seller: ctx.userVerify.id})
                return orders
                
            } catch (error) {
                console.log(error)
            }
        },
        //ORDER: GET ORDER BY ID
        getOrderById: async (_, {id}, ctx) => {
            //Verify Order exist
            const order = await Order.findById(id);
             if(!order){
                throw new Error ("This order doesn't exist")
             }
            //Only the seller can see the order
            if(order.seller.toString() !== ctx.userVerify.id){
                throw new Error ("You don't have the credentials to see this order")
            }
            //Return the result
            try {
                return order
            } catch (error) {
               console.log(error) 
            }

        },
        //ORDER: GET ORDER BY STATE
        getOrderByState: async (_, {state}, ctx) =>{
            const order = await Order.find({seller: ctx.userVerify.id, state});

            return order;
        },
        //ADVANCED SEARCHES: TOP CLIENTS
        topClients: async () => {
            const clients = await Order.aggregate([
                { $match: {state: "COMPLETE"} },
                { $group: {
                    _id: "$client",
                    total: { $sum: '$total'}
                }},
                {
                    $lookup: {
                        from: 'clients',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'client'
                    }
                },
                {
                    $limit: 5
                },
                {
                    $sort: { total: -1 }
                }
            ])
            return clients
        },
        //ADVANCED SEARCHES: TOP SELLER
        topSellers: async () => {
            const sellers = await Order.aggregate([
                { $match: {state: "COMPLETE"} },
                { $group: {
                    _id: "$seller",
                    total: { $sum: '$total'}
                }},
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'seller'
                    }
                },
                {
                    $limit: 3
                },
                {
                    $sort: { total: -1 }
                }
            ])
            return sellers
        },
        //ADVANCED SEARCHES: GET PRODUCT BY NAME
        getProductByName: async (_, {text}) =>{
            const products = await Product.find({$text: {$search: text}}).limit(10)

            return products;
        }
    },
    Mutation: {
        //USER MUTATION: NEW USER
        newUser: async (_, {input}) => {
            //Validations - email unique
            const { email, password } = input;

            const emailExist = await User.findOne({email});

            if(emailExist){
                throw new Error('This user already exists')
            };

            //Hashear password
            const salt = bcryptjs.genSaltSync(10);
            input.password = bcryptjs.hashSync(password, salt);

            //Save in DB
            try {
                const userdb = new User(input);
                userdb.save(); // save
                return userdb;
                //console.log("User create succesfully!")
               
            } catch (error) {
                console.log(error)
            }
        },
        //USER MUTATION: AUTENTICATION USER
        autenticationUser: async (_, {input}) => {
            //Validations - email user exist
            const { email, password } = input;

            const userExist = await User.findOne({email});
            if(!userExist){
                throw new Error("This user doesn't exist")
            };
            //Validations - correct password 
            const correctPassword = await bcryptjs.compareSync(password, userExist.password);
            if(!correctPassword){
                throw new Error("This password doesn't match")
            }
            //CREATE TOKEN
            return {
                token: createToken(userExist, process.env.SECRET, '24h')
            }
        },
        // PRODUCT MUTATION: NEW PRODUCT
        newProduct: async (_, {input}) => {
            try {
                //Create a new Product
                const product = new Product (input);
                // Save in Database
                const productdb = await product.save()

                return productdb

            } catch (error) {
                console.log(error)
            }
        },
        // PRODUCT MUTATION: UPDATE PRODUCT
        updateProduct: async(_, {id, input}) => {
            //Product exist
            let product = await Product.findById(id);
            if(!product){
                throw new Error("This product doesn't exist")
            }

            //Save in DB
            product = await Product.findOneAndUpdate({_id: id}, input, {new: true});

            return product;
        },
        // PRODUCT MUTATION: DELETE PRODUCT
        deleteProduct: async (_, {id}) => {
            //Product exist
            let product = await Product.findById(id);
            if(!product){
                throw new Error("This product doesn't exist")
            }

            await Product.findOneAndDelete({_id: id});

            return "The product has been deleted"
        },
        //CLIENT MUTATION: NEW CLIENT
        newClient: async(_, {input}, ctx) =>{

            const { email } = input
            //Client exist
            const clientExist = await Client.findOne({email});

            if(clientExist){
                throw new Error ("This client already exist")
            }
            //Create a new Client
            const newClient = new Client(input);
            //Assign seller(context)
            newClient.seller = ctx.userVerify.id

            try {
                //Save in DB 
                const clientdb = await newClient.save();
    
                return clientdb                
            } catch (error) {
                console.log(error)
            }
        },
        //CLIENT MUTATION: UPDATE CLIENT
        updateClient: async (_ ,{id, input}, ctx) => {
            //Verify client exist
            let client = await Client.findById(id)

            if(!client){
                throw new Error("This client doesn't exist")
            }
            //Verify who's seller
            if(client.seller.toString() !== ctx.userVerify.id){
                throw new Error ("You don't have the credentials to update this client")
            }
            //Save DB
            client = await Client.findOneAndUpdate({_id: id}, input, {new: true});

            return client;

        },
        //CLIENT MUTATION: DELETE CLIENT
        deleteClient: async (_, {id}, ctx) => {
            //Verify client exist
            let client = await Client.findById(id)

            if(!client){
                throw new Error("This client doesn't exist")
            }
            //Verify who's seller
            if(client.seller.toString() !== ctx.userVerify.id){
                throw new Error ("You don't have the credentials to delete this client")
            }
            //Delete Client  
            await Client.findOneAndDelete({_id: id})          
            return "This client has been deleted"
        },
        //ORDER MUTATION: NEW ORDER
        newOrder: async (_, {input}, ctx) => {
            
            const { client } = input //client is ID (check schema)
            //Verify: Client exist
            const clientExist = await Client.findById(client)
            
            if(!clientExist){
                throw new Error("This client doesn't exist")
            }

            //Verify: who's seller
            if(clientExist.seller.toString() !== ctx.userVerify.id){
                throw new Error ("You don't have the credentials with this client")
            }

            //Verify stock available
            for await(const item of input.order) {

                //ID product
                const { id } = item;
                //Find the product
                const product = await Product.findById(id)
                //Evalue 
                if(item.quantity > product.stock){
                    throw new Error(`The Item: ${product.name} exceeds the available quantity`)
                } else {
                    //Modify stock
                    product.stock = product.stock - item.quantity

                    await product.save()
                }
            }
                // New Order
                const newOrder = new Order(input);
                //Assign seller
                newOrder.seller = ctx.userVerify.id;
                //Save DB
                const order = await newOrder.save()

                return order

        },
        //ORDER MUTATION: UPDATE ORDER
        updateOrder: async (_, {id, input}, ctx) => {

            const { client } = input;

            //Verify order exist
            const order = await Order.findById(id);

            if(!order){
                throw new Error ("This order doesn't exist")
            }

            //Verify client exist
            const clientExist = await Client.findById(client)

            if(!clientExist){
                throw new Error ("This client doesn't exist")
            }

            //Verify seller
            if(clientExist.seller.toString() !== ctx.userVerify.id){
                throw new Error ("You don't have the credentials with this client")
            }
            //Verify stock available
            if(input.order){
                for await(const item of input.order) {
    
                    //ID product
                    const { id } = item;
                    //Find the product
                    const product = await Product.findById(id)
                    //Evalue 
                    if(item.quantity > product.stock){
                        throw new Error(`The Item: ${product.name} exceeds the available quantity`)
                    } else {
                        //Modify stock
                        product.stock = product.stock - item.quantity
    
                        await product.save()
                    }
                }
            }
            //Save DB
            const orderUpdate = await Order.findOneAndUpdate({_id: id}, input, {new: true});
            //Save DB
            return orderUpdate;

        },
        //ORDER MUTATION: DELETE ORDER
        deleteOrder: async (_, {id}, ctx) => {
            //Verify order exist
            const order = await Order.findById(id)

            if(!order){
                throw new Error("This order doesn't exist")
            }

            //Verify seller
            if(order.seller.toString() !== ctx.userVerify.id){
                throw new Error ("You don't have the credentials with this order")
            }

            //Delete order
            await Order.findOneAndDelete({_id: id});
            return "This order has been deleted"
        },
    }
};

module.exports = resolvers; 