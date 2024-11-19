const express = require("express");
const jwt = require("jsonwebtoken");

//middleware to validate JWT
exports.validateJWT = (req,res,next) => {
    // console.log(res.headers.authorization);
    const token = req.headers.authorization;
    if(!token){
        console.log("Token in required !")
        // next();
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodedToken){
        return res.status(401).send({message: "Unauthorized"});
    }
    req.user = decodedToken;
    console.log(decodedToken)
    next();
}