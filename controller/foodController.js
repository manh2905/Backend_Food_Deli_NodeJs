import foodModel from "../models/foodModel.js";
import fs from 'fs'
import multer from "multer"

//add food

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })

    try {
        await food.save()
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

export const upload = multer({ storage: storage })

export const addManyFoods = async (req, res) => {
    try {
        const files = req.files
        const foods = JSON.parse(req.body.foods)


        const foodDocs = foods.map((food, index) => ({
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category,
            image: files[index] ? files[index].filename : ""
        }))

        await foodModel.insertMany(foodDocs)
        res.json({ success: true, message: "Đã thêm nhiều món ăn!" })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}



const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }

}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Remove" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export { addFood, listFood, removeFood }