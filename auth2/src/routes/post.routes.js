const express=require("express");
const jwt=require("jsonwebtoken");

const router=express.Router();

router.post("/test",(req,res)=>{
    console.log(req.cookies.mama);
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decoded)
    }catch(err){
        return res.status(401).json({
            message:"unauthorized2"
        })
    }
    res.send("post created successfully");
})

module.exports=router