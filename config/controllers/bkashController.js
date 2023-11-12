
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");
let sess;
const User = require("../schemas/userSchema");
const Payment = require('../schemas/SurjoPaySchema');
const currentDate = require('../utilis/getCurrentDate');

const bkashToken = async() => {
    try{
     const tokenResponse = await fetch(
         `${process.env.Bkash_Root}/checkout/token/grant`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             username: process.env.Bkash_USER_NAME,
             password: process.env.Bkash_PASSWORD,
           },
           body: JSON.stringify({
             app_key: process.env.Bkash_KEY,
             app_secret: process.env.Bkash_SECRET,
           }),
         }
       );
       const tokenResult = await tokenResponse.json();
      return tokenResult.id_token;
    }catch(e){
     console.log(e);
    }
 };



const createPayment=asyncHandler(async (req, res) => {
    try{

   
        const token = await bkashToken();
        const cart=req.user.cartDetails
        sess=req.session
        sess.email=req.user.email
        sess.token=token
      
        const createResopnse = await fetch(
          `${process.env.Bkash_Root}/checkout/payment/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: token,
              "x-app-key": process.env.Bkash_KEY,
            },
            body: JSON.stringify({
              amount: cart.medium==="Private" ? cart.method.price : cart.salePrice, // amount should be dynamic
              currency: "BDT",
              intent: "sale",
              merchantInvoiceNumber: uuidv4().slice(0,8), // should be unique number
            }),
          }
        );
        const createResult = await createResopnse.json();
       
       
        res.send(createResult);
    }catch(e){
        console.log(e);
    }
  });


  const executePayment=asyncHandler(async (req, res) => {
    try{
        const paymentID = req.body.paymentID;
        console.log(sess)
  
        const executeResponse = await fetch(
          `${process.env.Bkash_Root}/checkout/payment/execute/${paymentID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: sess?.token,
              "x-app-key": process.env.Bkash_KEY,
            },
            body: JSON.stringify({
              paymentID
            }),
          }
        );
        const executeResult = await executeResponse.json();

      
        if (executeResult && executeResult.paymentID != null) { 
           
          // adding the course into user id

          User.findOne({ email: sess.email }).exec(async(error,data)=>{
             if(error) return res.status(400).json({status:false,error})
                // storing payment
             var newPayment = await Payment.create({
              order_id:executeResult.paymentID,
              amount:executeResult.amount,
              bank_trx_id:executeResult.trxID,
              invoice_no:executeResult.merchantInvoiceNumber,
              customer_order_id:data.cartDetails._id,
              name:data.name,
              email:data.email,
              sp_massage:"success",
              date_time:currentDate(),
              city:data.cartDetails.medium==="private" ? `${data.cartDetails.method.title}- ${data.cartDetails.method.selectedData}(monthly)`:"Full-payment",
              method:"bkash_merchant"

             });

             console.log(newPayment)

             const user = await User.find({ role: "student" })
             let studentId = 100 + user?.length + 1
             studentId = "QUS" + studentId

           

             if (!data.Course.includes(data.cartDetails._id)) {
    
             await User.findOneAndUpdate({ email: data?.email }, {
                  $push: {
                      Course: data.cartDetails._id,
                      studentPayment: newPayment?._id
                  },
                  $set: {
                      role: "student",
                      studentId: studentId,
                      cartDetails:{},
                      enrolledDate: currentDate()

                  }
              },
                  {
                      new: true,
                  }
              );

          } else {
               await User.findOneAndUpdate({ email: newPayment?.email }, {
                  $push: {
                      studentPayment: newPayment._id
                  },
                  $set: {    
                    cartDetails:{}               
                }
              },
                  {
                      new: true,
                  }
              );
          }

             res.send(executeResult);

          })
          
         
        } else { 
          return res.json({status:false,error:executeResult})
        } 
        
       
    }catch(e){
        res.json({status:false,error:e})
    }
  });




  module.exports = {
    createPayment,
    executePayment
  };



  // {"_id":"6360bd427c07f889a0646e25",
  // "id":1337359,
  // "order_id":"sp6360bcf2b4304",
  // "currency":"BDT",
  // "amount":1000,
  // "payable_amount":"1000.0000",
  // "discsount_amount":"0.0000",
  // "disc_percent":"0",
  // "usd_amt":"0.0000",
  // "usd_rate":"0",
  // "card_holder_name":null,
  // "card_number":null,
  // "phone_no":null,
  // "bank_trx_id":"9K19JEAYY3",
  // "invoice_no":"sp6360bcf2b4304",
  // "bank_status":"The Payment was Successful",
  // "customer_order_id":"jjkfjdg",
  // "sp_code":1000,
  // "sp_massage":"Success",
  // "name":"SAMIHA AMIN",
  // "email":"anita.0540@gmail.com",
  // "address":"Bangladesh",
  // "city":"45 Minutes-3 Days(Monthly)",
  // "value1":"nhe",
  // "value2":null,
  // "value3":null,
  // "value4":null,
  // "transaction_status":"Completed",
  // "method":"bKash",
  // "date_time":"2022-11-01 12:31:26","__v":0}