import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    timetoRead:{
        type:String
    },
    information:{
        type:String
    },
    tags:[
        {
            type:String
        }
    ],
    types:[
        {
            type:String
        }
    ]
})

const Blog = mongoose.model("Blog" , blogSchema)
module.exports = Blog