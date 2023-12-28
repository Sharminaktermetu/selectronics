const jsonwebtoken = require("jsonwebtoken")
const User=require('../schemas/userSchema')
const mongoose = require('mongoose');



const checkLogin = async(req, res, next) => {
    const { authorization } = req.headers
   
    try {
        if (authorization && authorization.startsWith('Bearer')) {
            const token = authorization.split(" ")[1]
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)


            req.user = await User.findById(decoded.id).select("-password");

                console.log(req.user)
            next()
        }


    } catch(err) {
         console.log(err)
        res.status(201).json({
            message:"not authorized "
        });
    }
}


const admin = (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
        next();
    } else {
        res.status(201).json({
            message:"not authorized as admin"
        });
       
    }
};
const teacher = (req, res, next) => {
    if (req.user && req.user.role == 'teacher') {
        next();
    } else {
        res.status(201).json({
            message:"not authorized as teacher"
        });
       
    }
};

const student = (req, res, next) => {
    if (req.user && req.user.role == 'student') {
        next();
    } else {
        res.status(201).json({
            message:"not authorized as student"
        });
       
    }
};
const StudentTeacherAdmin = (req, res, next) => {
    if (req.user && (req.user.role == 'teacher' || req.user.role == 'student' || req.user.role == 'admin') ) {
        next();
    } else {
        res.status(201).json({
            message:"not authorized as teacher"
        });
       
    }
};


module.exports = {checkLogin,admin,teacher,student,StudentTeacherAdmin}