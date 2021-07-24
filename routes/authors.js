const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

//All authors route
router.get('/', async (req,res)=>{
    let searchOption = {}
    if(req.query.name !== null && req.query.name !== ''){
        searchOption.name = new RegExp(req.query.name,'i')

    }
    try {
        const authors = await Author.find(searchOption)
        res.render('authors/index',{
            authors:authors,
            searchOptions:req.query
        })
        
    } catch (error) {
        res.redirect('/')
    }
    
})

//new author route
router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()})
})

//create author route
router.post('/', async (req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch(err){
        res.render('authors/new',{
            author:author,
            errorMessage:'Error creating Author'        
        })
    }
   
})


module.exports = router