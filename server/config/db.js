import mongoose from 'mongoose';
//fumction to connect the mdb

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('MongoDB connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/InternLink`)

}
export default connectDB;