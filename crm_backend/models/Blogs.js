import mongoose from "mongoose"

const blogsSchema = new mongoose.Schema({
    blog:[
        {
            heading:{
                type:String
            },
            blog:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Blog"
                }
            ]
        }
    ]
})

const Blogs = mongoose.model("Blogs" , blogsSchema)
module.exports = Blogs