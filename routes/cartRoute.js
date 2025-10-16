import express from "express"
import { addToCart, getCart, removeFromCart } from "../controller/cartController.js";
import authMiddleWare from "../middleware/auth.js";



const cartRouter = express.Router();

cartRouter.post("/add", authMiddleWare, addToCart)
cartRouter.post("/remove", authMiddleWare, removeFromCart)
//truyen /get voi body {}
cartRouter.post("/get", authMiddleWare, getCart)


export default cartRouter