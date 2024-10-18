import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

//Image storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename:(req, file, cb)=>{
      return cb(null, `${Date.now()}${file.originalname}`)
  }
})


const upload = multer({storage:storage})

//Updating the database with the food items
foodRouter.post('/add', upload.single("image"),addFood);

//Getting all the fooditme from the database
foodRouter.get('/list', listFood)

//Removing fooditme from the database
foodRouter.post('/remove', removeFood)

export default foodRouter;