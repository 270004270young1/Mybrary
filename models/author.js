const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    }
})

authorSchema.pre('remove', function(next){
    

    // try {
    //     const query = this.getFilter()
    //    // console.log(query._id.trim())
    //     const hasBook = await Book.exists({author:query._id.trim()})
    //     //console.log(hasBook)
    //     if(hasBook){
    //         next(new Error("This author still has books"))
    //     }else{
    //         next()
    //     }
    // } catch (error) {
    //     next(error)
    // }

    Book.find({author:this.id},(err,books)=>{
        if(err){
            next(err)
        }else if(books.length>0){
            next(new Error('This author has books still'))
        }else{
            next()
        }
    })

})

module.exports = mongoose.model('Author',authorSchema)