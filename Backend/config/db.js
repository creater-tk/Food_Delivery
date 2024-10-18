import mongoose from 'mongoose'

export const connectDB = async () =>{
  await mongoose.connect('mongodb+srv://root:root@cluster0.c3aji.mongodb.net/food-delivery').then(()=>console.log("Database connected"));
}