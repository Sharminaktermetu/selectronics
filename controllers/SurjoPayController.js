const axios = require("axios");
const express = require('express')
const { v4: uuid } = require("uuid");
const Payment = require('../schemas/SurjoPaySchema')
const User = require("../schemas/userSchema");
var FormData = require('form-data');
const currentDate = require("../utilis/getCurrentDate");
const asyncHandler = require("express-async-handler");

const checkoutPay = async (req, res) => {

    const { paymentData } = req.body


    try {
        const credentials = {
            "username": process.env.SURJO_USERNAME,
            "password": process.env.SURJO_PASS
        }
        const { data } = await axios.post(" https://engine.shurjopayment.com/api/get_token", credentials)

        console.log(req.body)

        let newdata = new FormData();
        newdata.append('prefix', 'sp');
        newdata.append('token', data?.token);
        newdata.append('return_url', 'https://api.qawmiuniversity.com/surjopay/checkout_return');
        newdata.append('cancel_url', 'https://api.qawmiuniversity.com/surjopay/checkout_cancel');
        newdata.append('store_id', data.store_id);
        newdata.append('amount', paymentData.amount);
        newdata.append('order_id', paymentData.order_id);
        newdata.append('currency', 'BDT');
        newdata.append('customer_name', paymentData?.customer_name);
        newdata.append('customer_address', paymentData.customer_address);
        newdata.append('customer_phone', paymentData.customer_phone);
        newdata.append('customer_city', paymentData.customer_city);
        newdata.append('customer_post_code', paymentData.customer_post_code);
        newdata.append('customer_email', paymentData.email);
        newdata.append('client_ip', '');
        newdata.append('value1', paymentData.value1);

        console.log(newdata)
        const newData = await axios.post(data.execute_url, newdata)
        console.log(newData)

        res.json(newData.data.checkout_url)
    } catch (error) {
        res.status(500).json({
            error: "Oops! Something went wrong",
          });
    }




}



const return_callback = async (req, res, next) => {

    try{
        const paymentId = req.query.order_id;
        const token = req.query.token;
        const credentialsToken = {
            "username": process.env.SURJO_USERNAME,
            "password": process.env.SURJO_PASS
        }

        // validating the paymentId
    
        const newData = await axios.post(" https://engine.shurjopayment.com/api/get_token", credentialsToken)
    
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${newData?.data?.token}`,
            },
        };
    
        const credentials = {
            "order_id": paymentId
        }
    
        let { data } = await axios.post("https://engine.shurjopayment.com/api/verification?orderid", credentials, config)
    
    
        data = data[0]


    
        if (data.sp_code === '1000') {
    
    
    
            var newPayment = await Payment.create(data);
    
            const userInfo = await User.findOne({ email: data.email })
            
            // updating user and payment for new payment
    
    
            if (newPayment?.city === "book") {
                const updateUser = await User?.findOneAndUpdate({ email: newPayment?.email }, {
                    $push: {
                        bookPayment: newPayment?._id,
                        Books: newPayment?.customer_order_id
                    },
                },
                    {
                        new: true,
                    }
                );
                res.redirect(`https://qawmiuniversity.com/libraryDetails/${newPayment.customer_order_id}`)
    
            } else {
    
    
            //    creating new student id
                const user = await User.find({ role: "student" })
                let studentId = 100 + user?.length + 1
                studentId = "QUS" + studentId
    
    
                // update in the user information
                if (!userInfo.Course.includes(newPayment.customer_order_id)) {
    
                    const updateUser = await User.findOneAndUpdate({ email: newPayment?.email }, {
                        $push: {
                            Course: newPayment?.customer_order_id,
                            studentPayment: newPayment?._id
                        },
                        $set: {
                            role: "student",
                            studentId: studentId,
                            enrolledDate: currentDate()
    
                        }
                    },
                        {
                            new: true,
                        }
                    );

                } else {
                    const updateUser = await User.findOneAndUpdate({ email: newPayment?.email }, {
                        $push: {
                            studentPayment: newPayment._id
                        },
                    },
                        {
                            new: true,
                        }
                    );
                }
    
    

    
                res.redirect("https://qawmiuniversity.com/check-out/done")
    
    
            }
    
        } else {
    
            res.redirect("https://qawmiuniversity.com/check-out/failed")
        }
    

    }catch(err){
        res.status(500).json({
            error: "Oops! Something went wrong",
          });
    }
   

}


const cancel_callback = async (req, res, next) => {
    const paymentId = req.query.order_id;
    let productId;


    res.redirect("https://qawmiuniversity.com/check-out/failed")



}

const getAllPayment = asyncHandler(async (req, res) => {
    try {
        const Payments = await Payment.find({}).populate("customer_order_id").find({ city: { $ne: 'book' } })

        res.status(201).json({
            success: true,
            data: Payments,
        });
    } catch (error) {

        res.status(401).json({
            error: "Something error, can not get payment data",
        });
    }
});

module.exports = { checkoutPay, return_callback, cancel_callback, getAllPayment }