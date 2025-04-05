import jwt from "jsonwebtoken";

const jwtToken = (userid, res)=>{
    // token expires in 1 month
    const token = jwt.sign({userid} , process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
    res.cookie('jwt' , token,{
        maxAge: 30 *24 *60 *60 *1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.SECURE !== "development"
    })
}

export default jwtToken