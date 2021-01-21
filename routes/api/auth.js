const express= require('express')
const router= express.Router();
const User= require('../../modals/User')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth=require('../../middlewares/authentication')
const jwtSecret='sl';
router.post('/',function(req,res){
    console.log("inside auth body ",req.body)
  const{email,password}=req.body

  if(!email||!password){
      return res.status(404).json({msg:'please enter valid fields '})
  }

  User.findOne({email})
  .then(user=>{
      if(!user){
          return res.status(404).json({msg:'User does not exist try sign up'})
      }

    bcrypt.compare(password,user.password)
    .then(match=>{
        if(!match){return res.status(400).json({msg:"invalid credentials"})}

        jwt.sign(
            {id: user.id},
            jwtSecret,
            {expiresIn : 3600},
            (err,token)=>{
              if(err) {console.log("error in JWT :",err)}


              res.json({
                  token,
                user: {
                    id: user.id,
                    name:user.name,
                    email:user.email
                }
            })
            }

        )
    })
   
  })
})
router.get('/user',auth,(req,res)=>{
    console.log("reqqqqqqqqqqqqqqq",req.user)
     User.findById(req.user.id)
     .select("-passowrd")
     .then(user=> res.json(user))
})
module.exports=router