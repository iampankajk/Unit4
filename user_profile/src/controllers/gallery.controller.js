const express = require('express');

const upload = require('../middleware/upload');
const Gallery = require('../models/gallery.model');
const router = express.Router();


router.post('/multiple', upload.any("pictures_urls"), async(req,res)=>{
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
})

module.exports = router;