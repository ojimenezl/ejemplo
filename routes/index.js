const { Router } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();
// Models
const Image = require('../models/Image');


router.get('/repositorio', async(req, res) => {
    const images = await Image.find().sort({ date: "desc" }).lean();
    res.render('repositorio', { images });
});

router.get('/upload', async(req, res) => {
    res.render('upload');
});

router.post('/upload',async(req, res) => {
    const image = new Image();
    image.path = '/img/uploads/' + req.file.filename;
    const pyth = require('../ocrnode');
    arg1=image.path
    console.log("aqui1",arg1)
    pyth.publicar(arg1,req,res).then(respu=>publicar(respu,req,res)).then(resf=>{ console.log(resf)})
         


});

async function publicar (respu,req, res){
    const image = new Image();
    console.log(respu.toString('utf8'),"adentro para guardar")
    image.predic=respu.toString('utf8')
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    
    res.redirect('/repositorio');
    

}

router.get('/image/:id', async(req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

router.delete('/imagedelete/:id', async(req, res) => {
    await Image.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "ELIMINADO");
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    res.redirect('/repositorio');
});

module.exports = router;