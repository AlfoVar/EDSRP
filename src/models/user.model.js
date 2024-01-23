import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, require:true, trim:true},
    email:{type:String, require:true, trim:true, unique:true},
    password:{type: String, require:true}
},{
    timestamps: true //colocar fecha de creacion
})

export default mongoose.model('User', userSchema)