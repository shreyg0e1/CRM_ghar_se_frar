import mongoose from "mongoose"

const escapeSchema = new mongoose.Schema({
    type:{
        type:String
    },
    image:{
        type:String
    },
    name:{
        type:String
    },
    price:{
        type:String
    },
    details:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Detail"
    }

},{
    timestamps:true
})

const Escape = mongoose.model("Escape" , escapeSchema)
export default Escape;