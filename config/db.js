const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    // const URL = `mongodb+srv://medic2023:medic123456@cluster0.hni0be3.mongodb.net/?retryWrites=true&w=majority`;
    try {
        // await mongoose.connect(URL);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`MongoDB Server Issue ${error}`.bgRed.white);
    }
};

module.exports = connectDB;