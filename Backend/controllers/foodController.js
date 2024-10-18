import { privateDecrypt } from "crypto";
import foodModel from "../models/foodModel.js";
import fs from 'fs'

//fs means file system

//add food item
const addFood = async (request, response) =>{

  let image_filename = `${request.file.filename}`;

  const food = new foodModel({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    category: request.body.category,
    image:image_filename
  })
  try{
    await food.save();
    response.json({success: true, message: "Food Added"})
  }catch(e){
    console.log(e);
    response.json({success: false, message:"error"})
    
  }
}

//all food list
const listFood = async (request, response)=>{
  try {
    const foods = await foodModel.find({});
    response.json({success:true, data:foods})
  } catch (error) {
    console.log(error);
    response.jsont({success:false, message: error})
    
  }
}


//remove food item
const removeFood = async (request, response) =>{
  try {
    const food = await foodModel.findById(request.body.id);
    fs.unlink(`uploads/${food.image}`, ()=>{})

    await foodModel.findByIdAndDelete(request.body.id);
    response.json({success:true, message:"Food removed"})
  } catch (error) {
    console.log(error);
    response.json({success:false, message:"error"})
    
  }
}

export {addFood, listFood, removeFood}