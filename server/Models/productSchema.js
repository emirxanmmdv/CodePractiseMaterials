import mongoose from "mongoose";
const {Schema} = mongoose

const productSchema = new Schema({
    image : String,
    name : String,
    desc: String,
    price: Number
})

export const epsteinSchema = mongoose.model("itmahan", productSchema)