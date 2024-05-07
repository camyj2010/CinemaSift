import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbconnect = async () => {
    try {
        console.log("inicio bd")
        await mongoose.connect(process.env.MONGO);
        console.log("Conexión correcta a la base de datos");
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
    }
};

export default dbconnect;