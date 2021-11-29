const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/job");
}

const companySchema = new mongoose.Schema({
    company_name:{type:String,required:true},
    city:{type:String,required:true},
    summary:{type:String,required:false},
    est_year:{type:Number,required:true},
},{
    versionKey:false,
});

const Company = mongoose.model("company",companySchema);

const jobSchema = new mongoose.Schema({
    role:{type:String,required:true},
    skills:[
        {
            type:String,
            required:true
        }
    ],
    type:{type:String,required:true},
    notice_period:{type:Number,required:false},
    rating:{type:Number,required:false},
    company_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        required:true,

    }
},{
    versionKey:false
});

const Job = mongoose.model("job",jobSchema);

// get companies details
app.get('/company/:name', async (req,res)=>{
    try{
        const company = await Company.find({company_name:req.params.name});
        return res.send(company);
    }
    catch(e){
        res.status(500).json({message:e.message,status:"failed"})
    }
});

// get all companies
app.get('/company', async (req,res)=>{
    try{
        const company = await Company.find().lean().exec();
        return res.send(company);
    }
    catch(e){
        res.status(500).json({message:e.message,status:"failed"})
    }
});

// post company detail
app.post('/company', async (req,res)=>{
    try{
        const company = await Company.create(req.body);
        return res.send(company);
    }
    catch(e){
        res.status(500).json({message:e.message,status:"failed"})
    }
});




// CRUD api for job

// get all jobs from all companies
app.get('/jobs', async (req,res)=>{
    try{
        const jobs = await Job.find().populate("company_name").lean().exec();
        return res.send(jobs);
    }
    catch(e){
        res.status(500).json({message:e.message,status:"failed"})
    }
});


// jobs sort by rating
app.get('/jobs/rating', async (req,res)=>{
    try{
       const jobs = await Job.find().sort({rating:1}).populate("company_name").lean().exec();

       return res.send(jobs);
    }
    catch(e){
        res.status(500).json({message:e.message,status:"failed"})
    }
});


// notice period of 2 months
app.get('/jobs/notice', async (req,res)=>{
    try{
       const jobs = await Job.find({"notice_period":{$eq:2}}).populate("company_name").lean().exec();

       return res.send(jobs);
    }
    catch(e){
        res.status(500).json({message:e.message,status:"failed"})
    }
});


// work from home jobs
app.get('/jobs/wfh', async (req,res)=>{
    try{
       const jobs = await Job.find({"type":{$eq:"work from home"}}).populate("company_name").lean().exec();

       return res.send(jobs);
    }
    catch(e){
        res.status(500).json({message:e.message,status:"failed"})
    }
});






// create jobs
app.post('/jobs', async (req,res)=>{
    try{
        const job = await Job.create(req.body);
        return res.send(job);
    }
    catch(e){
        res.status(500).json({message:e.message,status:"failed"})
    }
});



app.listen('4500', async(req,res)=>{
    await connect();
    console.log("app is linstening on port 4500");
})