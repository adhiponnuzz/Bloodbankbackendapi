const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var bloodmodel=Mongoose.model("blood",
new Mongoose.Schema(
    {
        name:String,
        address:String,
        bloodgroup:String,
        mobileno:String,
        username:String,
        password:String



    }


)

)

Mongoose.connect("mongodb+srv://adithya:adithya@cluster0.9dgmv.mongodb.net/bloodDb")

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    bloodmodel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":error})
        }
        else{
            res.send({"status":"success"})
        }
    })


})

app.post("/api/search",(req,res)=>{
    var getName=req.body
    bloodmodel.find(getName,
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else{
                res.send(data)
            }
        }
        
        )
})

app.post("/api/addblood",(req,res)=>{
    var getName=req.body.name
    var getAddress=req.body.address
    var getBloodgroup=req.body.bloodgroup
    var getMobileno=req.body.mobileno
    var getUsername=req.body.username
    var getPassword=req.body.password

    data={"name":getName,"address":getAddress,"bloodgroup":getBloodgroup,"mobileno":getMobileno,"username":getUsername,"password":getPassword}
    let myblood=new bloodmodel(data)
    myblood.save((error,data)=>{
        if(error)
        {

            res.send({"status":"error","data":error})
        }
        else{
            res.send({"status":"success","data":data})
        }





    })


})
app.get("/api/view",(req,res)=>{

    bloodmodel.find(
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
               res.send(data) 
            }



    })
    


})
app.listen(4000,()=>{
    console.log("server running")


})