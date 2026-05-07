import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';
dotenv.config();
const PORT = process.env.PORT || 8080;
const startServer = async () => {
    try{
        await connectDB();
        app.listen(PORT,"0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(err){
        console.error("Error starting server: ", err);
        process.exit(1);
    }
}
startServer();