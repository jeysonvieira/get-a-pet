import { Schema } from "mongoose";
import mongoose from "../db/conn.js";




const Pet = mongoose.model('Pets', new Schema({

    name : {
        type : String,
        required : true
    },

    age : {
        type : Number,
        required : true
    },

    type : {
        type : String,
        required : true
    },

    owner : {
        type : String,
        required : true
    },

    adopted : {
        type : Boolean,
        required : true
    }
}))


export default Pet