const mongoose =require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type: String, required:true},
    suppiler: {type: String, required:true},
    price: {type: String, required:true},
    imageUrl: {type: String, required:true},
    description: {type: String, required:true},
    product_location: {type: String, required:true},
},{timestamps:true});

ProductSchema.index({ title: 'text', product_location: 'text' });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;