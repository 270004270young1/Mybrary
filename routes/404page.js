const notFound = (req,res)=>{
    res.status(404).render('404page')
}

module.exports = notFound;