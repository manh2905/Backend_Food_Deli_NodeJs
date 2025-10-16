import jwt from "jsonwebtoken"

const authMiddleWare = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, message: "login again" })
    }
    console.log("SECRET:", process.env.JWT_SECRET);
    console.log("TOKEN:", token);
    console.log("Method:", req.method);
    console.log("Body:", req.body);

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "error middle" })
    }
}

export default authMiddleWare