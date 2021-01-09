const express= require('express');

const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'Uploads/'});

const Post= require('../model/Post');


//Get back all post
router.get('/', async(req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json({message : err});
    }
    //res.send('Weareonposts');
    });

router.get('/specific', (req,res) => {
        res.send('specificcc');
        });

//submits post
router.post('/', upload.single('productImg') , async(req,res) =>{
    console.log(req.file);
    const post = new Post({

        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        place: req.body.place,

       
    });

try{
    const savedPost = await post.save();
    res.json(savedPost);
    
    /*.then(data =>{
      res.json(data);
    })
    .catch(err => {
        req.json({message: err});
    });*/

}

catch(err){
    res.json({ msg: err });
}
});

//gets specific post
router.get('/:postId', async (req,res) => {
    //console.log(req.params.postId);
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }
    catch(err){
        res.json({message : err});
    }
});

//delete post

router.delete('/:postId', async (req,res) => {
    try{
   const removedPost = await Post.remove({_id: req.params.postId});
   res.json(removedPost);
    }
    catch(err){
        res.json({message : err});
    }
});

//update post

router.patch('/:postId', async (req,res) => {
    try{
   const updatedPost = await Post.updateOne(
       {_id: req.params.postId}, 
       { $set: {title: req.body.title}});
       res.json(updatedPost);
       
    }
    catch(err){
        res.json({message : err});
    }
})

 
    module.exports = router;