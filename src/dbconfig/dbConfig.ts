import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("mongodb connected successfully");
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });
    } catch(err){
        console.log("something went wrong while connecting to server");
        console.log(err);
    }
}