const bcrypt =require('bcrypt')
const _= require('lodash')
const axios =require('axios')
const otpGenarator =require ('otp-generator')

const User = require('../schemas/userSchema');
const { Otp } = require('../schemas/otpModel.js');


module.exports.signup=async(req,res)=>{
    // const newUser = await User.find({ mobile: req.body.mobile });

    // if (newUser) return res.status(400).send('User already registered !')
    const OTP =otpGenarator.generate(6,{
        digits:true, 
        lowerCaseAlphabets:false,
        upperCaseAlphabets:false,       
        specialChars:false
    })
    const mobile =req.body.mobile
    console.log(OTP);

    const otp =new Otp({mobile:mobile,otp:OTP})
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    
    const result =otp.save()

    return res.status(200).send('OTP send successfully')
    
}
module.exports.verifyOtp=async(req,res)=>{
    const otpHolder = await Otp.find({mobile:req.body.mobile})
    if (otpHolder.length ===0 ) return res.status(400).send('Otp expired')

    const rightOtpFind =otpHolder[otpHolder.length-1]

    const validUser =await bcrypt.compare(req.body.otp, rightOtpFind.otp)
    if (rightOtpFind.number === req.body.number && validUser) {
        const newUser = new User(_.pick(req.body,["mobile"]))
        const token = newUser.generateJwt()
        const result = await newUser.save()
        const otpDelete = await Otp.deleteMany({
            mobile:rightOtpFind.number
        })
        return res.status(200).send({
            message:"user create success",
            token:token,
            data:result
        })
    }else{
        return res.status(400).send('your otp was wrong')
    }
   
    
}