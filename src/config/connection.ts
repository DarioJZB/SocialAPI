import mongoose from 'mongoose'

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialAPIDB');
        console.log('Database connected.');
        return mongoose.connection;
    } catch(error) {
        console.error('Database connection erro: ', error);
        throw new Error('Databse connection failed.');
    }
}

export default db;