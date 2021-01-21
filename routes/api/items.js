const express= require('express')
const router= express.Router();
const Item= require('../../modals/Item')
const auth= require('../../middlewares/authentication')

router.get('/',function(req,res){
    Item.find()
     .then(items=>res.json(items))
})


router.post('/',function(req,res){
    
    const newItem =new Item({
        name: req.body.name,
        quantity: req.body.quantity
    })

    newItem.save().then(item=> res.json(item))    
})
/*
router.delete('/:id',function(req,res){
    Item.findById(req.params.id)
    .then(item => item.remove().then(()=> res.json({success:true})))
    .catch(err =>res.status(404).json({success : false}))
})*/
router.delete('/:id',function(req,res){
    Item.findById(req.params.id,function(err,item){
        item.remove()

        return res.json({success: true})
    })
 
})

module.exports= router