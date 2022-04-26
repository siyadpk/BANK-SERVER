database = {
    1000:{acc:1000,usname:'siya',passwd:123,bal:1000,transaction:[]},
    1001:{acc:1001,usname:'zia',passwd:113,bal:1000,transaction:[]},
    1002:{acc:1002,usname:'ziyad',passwd:223,bal:1000,transaction:[]}
  }



  //register function

   const Register=(acc,usname,passwd)=>{

    db=database

      if(acc in db){
        return false
      }
      else{
        db[acc]={
          acc,
          usname,
          passwd,
          bal:0,
          transaction:[]
        }
       
        return true
      }

   }
   module.exports={
       Register
    }