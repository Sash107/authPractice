const express=require("express");
const userModel=require("../models/auth.model");
const jwt=require("jsonwebtoken");

async function registerUser(req,res){
    const {username,email,password}=req.body;

    const doesuserexist=await userModel.findOne({
        email:email
    })
    if(doesuserexist){
        return res.status(409).send(
            "User already exist"
        )
    }
    const user=await userModel.create({username,email,password});

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET_KEY);
    
    res.cookie("token",token);

    res.status(201).json({
        message:"user registered",
        token
    }) 
}
module.exports={registerUser}