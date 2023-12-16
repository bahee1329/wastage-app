const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    products:[
        {
            cardItem:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
},{timestamps:true})

const Card = mongoose.model('Card',CardSchema)

module.exports =Card