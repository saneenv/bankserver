// web token

const jwt=require('jsonwebtoken')

// register

userDetails=
{
    1000:{acno:1000,username:"anu",password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:"amal",password:123,balance:0,transaction:[]},
    1002:{acno:1002,username:"arjun",password:123,balance:0,transaction:[]},
    1003:{acno:1003,username:"ramesh",password:123,balance:0,transaction:[]}

  }


register=(acno,uname,psw)=>{
    if(acno in userDetails){
      return {
        statuscode:401,
        status:false,
        message:"user already exist"
      }
    }
    else{
      userDetails[acno]={acno,username:uname,password:psw,balace:0,transaction:[]}
      console.log(userDetails);
      
      return {
        statuscode:200,
        status:true,
        message:"registration success"
      }
    }
}

login=(acno,psw)=>{

  

    if(acno in userDetails){
    if(psw==userDetails[acno]["password"]){
      const token=jwt.sign({currentAcno:acno},'secretkey123')


      return{
        statuscode:200,
        status:true,
        message:"login success",
        token

      } 
    }
    else{
      return{
        statuscode:401,
        status:false,
        message:"incorrect password"
      }
    }
  }
    else{
      return {
        statuscode:401,
        status:false,
        message:"incorrect acc number"
      }
    }

  }
  deposit=(acno,password,amount)=>{
    var amnt=parseInt(amount)
    if(acno in userDetails){
      if(password==userDetails[acno]["password"]){
       userDetails[acno]["balance"]+=amount
       userDetails[acno]['transaction'].push({type:'CREDIT',amount:amount})
       return {
        statuscode:200,
        status:true,
        message: userDetails[acno]["balance"]
       }
       
      }
    
    else{
      return { statuscode:401,
      status:false,
      message:"incorrect password"
    }
  }
  }
    else{
      return { 
      statuscode:401,
      status:false,
      message:"incorrect acno"
    }
  }
  }
  withdraw=(acnum,pswrd,amont)=>{
    var amnt=parseInt(amont)
    if(acnum in userDetails){
      if(pswrd==userDetails[acnum]["password"]){
        if(amont<=userDetails[acnum]["balance"]){
       userDetails[acnum]["balance"]-=amont
       userDetails[acnum]['transaction'].push({type:'DEBIT',amount:amont})

       return{
        statuscode:200,
        status:true,
        message: userDetails[acnum]["balance"]
  
       }
       
      }
      
    
    else{
      return    { 
      statuscode:401,
      status:false,
      message:"insufficient balance"

    }
  }
  }
    else{
      return {
        statuscode:401,
        status:false,
        message:"incorrect psw"
  
      }
    }
  }
    else{
      return {  
      statuscode:401,
      status:false,
      message:"incorrect acno"

    }
  }
  }
  gettransaction=(acno)=>{
    if(acno in userDetails){
    return{
      statuscode:200,
      status:true,
      message:userDetails[acno]["transaction"]

    }
  }
  else{
    return{
      statuscode:401,
      status:false,
      message:"incorrect acno"
    }
  }
}


module.exports={
    register,login,deposit,withdraw,gettransaction
}