const express=require("express");
const cors=require("cors");
const stripe_api =require("./api");
const app=express();

app.set('port',process.env.PORT || 3000);

//middileware
app.use(express.json());
app.use(cors());
app.use("/api/v1/stripe_api",stripe_api);

//routes
app.get("/",(req,res)=>{
    res.send("payment start");
});

//listen
app.listen(app.get('port'),()=>console.log(`Server Running on ${app.get('port')}`));