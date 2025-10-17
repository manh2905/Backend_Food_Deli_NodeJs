import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { listOrders, placeOrder, upadateStatus, userOrder, verifyOrder } from "../controller/orderController.js";
// import { verify } from "jsonwebtoken";


const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/orderusers", authMiddleWare, userOrder)
orderRouter.post("/list", listOrders)
orderRouter.post("/update", upadateStatus)
export default orderRouter