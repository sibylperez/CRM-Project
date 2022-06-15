const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connect')
    } catch (error) {
        console.log(error);
        console.log('Error with database connection');
        process.exit(1); // stop the app
    }
};

module.exports = connectDB;