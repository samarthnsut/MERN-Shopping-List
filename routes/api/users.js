const express= require('express')
const router= express.Router();
const User= require('../../modals/User')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret='sl';

router.post('/',function(req,res){

    console.log("inside the usr post req:",req.body)

  const{name,email,password}=req.body
  
  if(!name||!email||!password){
      return res.status(404).json({msg:'please enter valid fields '})
  }

  User.findOne({email})
  .then(user=>{
      if(user){
          return res.status(404).json({msg:'User already exist try sign in'})
      }

      const newUser= new User({
          name,
          email,
          password
      })
      bcrypt.genSalt(10,function(err,salt){

        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) {console.log("error bcrypt :",err)}

            newUser.password=hash;
            newUser.save()
             .then(user=>{

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
  })
})

module.exports=router