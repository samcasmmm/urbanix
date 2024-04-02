import { createLinePrint } from '../utils/devHelper';
import mongoose from 'mongoose';

const connectDatabase = async () => {
    const { MONGO_PATH, MONGO_USER, MONGO_PASSWORD } = process.env;
    mongoose.set('strictQuery', true);
    mongoose
        .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
        .then(() => {
            console.log('MongoDB Connected');
            createLinePrint(50);
        })
        .catch((error) => {
            console.warn('Error in connection', error);
            process.exit(1);
        });
};

export default connectDatabase;
