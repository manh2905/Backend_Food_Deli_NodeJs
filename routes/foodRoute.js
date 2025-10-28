import express from "express"
import { addFood, listFood, removeFood, addManyFoods } from "../controller/foodController.js"
import multer from "multer"

const foodRouter = express.Router()

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })


foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.delete("/remove", removeFood)
foodRouter.post("/addMany", upload.array("images", 50), addManyFoods)





export default foodRouter