const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const { removeAllListeners } = require('../Models/User/user');
dotenv.config();


  let checkAuth = (req, res, next)=>{
    try {
        let token = req.headers.authorization;
   
     if(!token){
         res.status(401).json({ message: "Unauthorized"})
         return;
     }
     token = token.split(" ")[1]; 
     
        jwt.verify(token, process.env.JWT_SECRET, async (err,decoded)=>{
    
  if(err){
      res.status(401).json({ message: "Unauthorized", error: err})
     return 
    
  }
  
  const userId = decoded.id;
  const role = decoded.role;
  req.role = role;
//   if(role != "admin"){
//     return res.status(401).json({ message: "Unauthorized"});
//   }

  req.userId = userId;
  
  next();
  });
        
    } catch (error) {
        return res.send(500).json({ message: "Internal Server Error", error: error.message});
    }
}

let checkAdmin = async (req, res, next)=>{
    try {
       let user_id = req.userId;
       let checkrole = await User.findById({_id: user_id});
        let role = checkrole.role;
 if(!role || role != "admin"){
    return res.status(401).json({ message: "Unauthorized i.e. no permissions"});
  }
next();
  
        
    } catch (error) {
        return res.send(500).json({ message: "Internal Server Error", error: error.message});
        
    }
}

module.exports = {
    checkAuth, 
    checkAdmin,
}