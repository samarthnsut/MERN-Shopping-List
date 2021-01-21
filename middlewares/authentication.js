const jwt= require('jsonwebtoken')
const config= require('config')


function authenticate(req,res,next){
    const token = req.header('x-auth-header')


    if(!token){ return res.status(401).json({msg:'Unautherized'})}

    try{
        const decode= jwt.verify(token,config.get('jwtSec'));
        
        req.user=decode;
        console.log("req",req.user)
        next();

    }catch(e){
          res.status(400).json({msg: " invalid token"})
    }
}

module.exports = authenticate