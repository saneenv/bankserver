// import dataservice file from service folder

const dataservice=require('./services/dataservice')

// import jsonewebtoken

const jwt=require('jsonwebtoken')



// import express
const express=require('express')

// create app

const app=express()

// to convert JSON data

app.use(express.json())


// midddleware for verify the token

const jwtmiddleware=(req,res,next)=>{
    console.log("router specific middleware.......");
   try{
    const token=req.headers['access-token']
    const data=jwt.verify(token,"secretkey123")
    console.log(data);
    next()
   }
   catch{
      res.status(422).json(  {
            statuscode:422,
            status:false,
            message:"please login"
        })
   }
}


// request




// register

app.post('/register',(req,res)=>{

   const result= dataservice.register(req.body.acno,req.body.uname,req.body.psw)
   res.status(result.statuscode).json(result)


})


// login
app.post('/login',(req,res)=>{

   const result= dataservice.login(req.body.acno,req.body.psw)
   res.status(result.statuscode).json(result)



})

// deposit
app.post('/deposit',jwtmiddleware,(req,res)=>{

    const result= dataservice.deposit(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statuscode).json(result)
 
 
 
 })
// withdraw
app.post('/withdraw',jwtmiddleware,(req,res)=>{

    const result= dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statuscode).json(result)
 
 
 
 })
//transaction history
app.post('/transaction',jwtmiddleware,(req,res)=>{

    const result= dataservice.gettransaction(req.body.acno)
    res.status(result.statuscode).json(result)
})


// delete

// GET

// app.get('/',(req,res)=>{
//     res.send('GET Method checking...........')
// })

// // post
// app.post('/',(req,res)=>{
//     res.send('post Method checking...........')
// })



// // put
// app.put('/',(req,res)=>{
//     res.send('put Method checking...........')
// })

// // patch
// app.patch('/',(req,res)=>{
//     res.send('patch Method checking...........')
// })

// // delete
// app.delete('/',(req,res)=>{
//     res.send('delete Method checking...........')
// })


// set port
app.listen(3000,()=>{
    console.log("server started at port number 3000");
})

