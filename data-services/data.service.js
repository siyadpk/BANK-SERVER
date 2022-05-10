const { status } = require("express/lib/response")
const jwt=require("jsonwebtoken")
const db=require('./db')
database = {
    1000:{acc:1000,usname:'siya',passwd:123,bal:1000,transaction:[]},
    1001:{acc:1001,usname:'zia',passwd:113,bal:1000,transaction:[]},
    1002:{acc:1002,usname:'ziyad',passwd:223,bal:1000,transaction:[]}
  }



  //register function

   const Register=(acc,usname,passwd)=>{

  
    //asynchronous
    return db.User.findOne({acc})
    .then(user=>{
      console.log(user);
      if(user){
        return {
          statuscode:401,
          status:false,
          message:'Existing user..!'
        }
      }
      else{
        const newUser=new db.User({
        
          acc,
          usname,
          passwd,
          bal:0,
          transaction:[]
        })
        newUser.save()
       
        return {
          statuscode:201,
          status:true,
          message:'successfully resgisteres...'

        }
      }

    })

      
     
   }


   //Login function
   const login=(acc,pwd)=>{
     
 return db.User.findOne({acc,passwd:pwd})
   .then(user=>{
     if(user){
      currentuser=user.usname
      currentaccno=acc
      //token generation
      const token=jwt.sign({
        currentaccno:acc
      },"siyad123")
  
     
      return {
            statuscode:201,
            status:true,
            message:'successfully login...',
            token:token,
            currentuser,
            currentaccno
          }

     }
     else{
      return {
        statuscode:401,
        status:false,
        message:'user doesnot exist..!'
            }

     }
   })
   

   
}




//deposit function

const deposit=(req,acc,pwd,amt)=>{

 let amount=parseInt(amt)
return db.User.findOne({acc,passwd:pwd})
.then(user=>{
  if(user){
    user.bal+=amount
    user.transaction.push({
      type:'CREDIT',
      amount:amount

    })
    user.save()
    return {
      statuscode:201,
      status:true,
      message:amount+'successfully deposited...new balance is'+ user.bal
     }
    
  }
  else{
   
    return {
     statuscode:401,
     status:false,
     message:'user doesnot exist..!'
    }
  }
 
})


}

//withdraw functions

const withdraw=(req,acc,pwd,amt)=>{

  let amount=parseInt(amt)

 return db.User.findOne({acc,passwd:pwd})
  .then(user=>{
    if(req.currentacno!=acc){
      return {
        statuscode:401,
    status:false,
    message:'Operation Denied..!'
      }
    }
    if(user){

      if(user.bal>amt){
        user.bal-=amount
        user.transaction.push({
          type:'DEBIT',
          amount:amount

        })
        user.save()
       
        
        
      return {
        statuscode:201,
      status:true,
      message:amount+'successfully withdraw...new balance is'+ user.bal
      }
    }else{
      
      return {
        statuscode:401,
    status:false,
    message:'insufficient balanace..!'
      }
    }



    }
    else{
      return {
        statuscode:401,
        status:false,
        message:'user doesnot exist..!'
      }

    }
  })
  

  
    

  }
  
 





//transaction history
const Transaction=(req,acc)=>{
  return db.User.findOne({acc})
  .then(user=>{
    if(req.currentacno!=acc){
      return {
        statuscode:401,
    status:false,
    message:'Operation Denied..!'
      }
    }

    if(user){
      return{
        statuscode:201,
          status:true,
         transaction:user.transaction
      } 

    }
    else{
      return{ statuscode:401,
        status:false,
        message:'user doesnot exist..!'
       }
    }
  })
}

  const DeleteAcc=(acc)=>{
    console.log(acc);
   return db.User.deleteOne({acc})
    .then(user=>{
      if(!user){
        return{ statuscode:401,
          status:false,
          message:'Operation Failed..!'
         }

      }
      else{
        return{
          statuscode:201,
            status:true,
          message:'successfully deleted'+acc
        } 
  

      }

    })
  }


   module.exports={
       DeleteAcc,
       Register,
       login,
       deposit,
       withdraw,
      Transaction,
      
    }