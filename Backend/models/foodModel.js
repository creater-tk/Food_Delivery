import { mongoose } from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category:{type:String, required: true}
})
    //Schema is used for to create blue print to store the data in what formate. To use this schema, you would typically create a model from it. EX: const Food = mongoose.model('Food', foodSchema);


const foodModel = mongoose.models.food || mongoose.model('food', foodSchema)


export default foodModel