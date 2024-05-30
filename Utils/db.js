const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

if (!URI) {
    console.error("MONGODB_URI not defined in the environment variables");
    process.exit(1);
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection successful to DB");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
};



module.exports = connectToDatabase;