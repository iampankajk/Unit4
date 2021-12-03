const express = require('express');
const fs = require('fs');

const upload = require('../middleware/upload');
const Gallery = require('../models/gallery.model');
const router = express.Router();


router.post('/multiple', upload.array("photos",5), async(req,res)=>{
    try{

        const filePaths = req.files.map(file=>file.path);

        const gallery = await Gallery.create({
            pictures:filePaths,
            user_id:req.body.user_id,
        });

        res.send(gallery);
    }
    catch(e){
        return res.status(500).send({status:"Failed",message:e.message});
    }
});


router.delete('/multiple/:id', async(req,res)=>{

    
    try{

        const {pictures}  = await Gallery.findById(req.params.id);
        
        console.log(pictures)

        pictures.forEach(async (pic)=>{
           await fs.unlinkSync(pic)
        });


        res.send("del");
    }
    catch(e){
        return res.status(500).send({status:"Failed",message:e.message});
    }
});



module.exports = router;