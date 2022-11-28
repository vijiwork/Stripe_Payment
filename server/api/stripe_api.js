const express=require("express");
const router=express.Router();
const stripe=require("stripe")("your stripe secret key")
const {v4: uuidv4} =require("uuid");

router.post("/payment",(req,res)=>{
    console.log(req.body)
    console.log(req.query)
    console.log(req.params)
    const {product,token } =req.body;
    console.log(product,"product details");
    
    const idempotency_key=uuidv4();

    return stripe.customers.create({
        email:token.email,
        source:token.idempotency_key
    })
    .then(customer=>{
        stripe.charges.create({
            amount:product.price,
            currency:'inr',
            customer:customer.id,
            receipt_email:token.email,
            description:product.name,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.adress_country
                }
            }
        },{idempotency_key})
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))
});


module.exports = router;