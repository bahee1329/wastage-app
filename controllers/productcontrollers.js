const Product = require('../models/Products');

module.exports = {
    createProduct : async(req,res)=>{
       
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(200).json('product created sucessfully')
        } catch (error) {
            res.status(500).json('failed to create the product')
            
        }
    },
 
    getAllProduct: async(req,res) =>{
        try {
            const products = await Product.find().sort({createAt: -1})
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json('filed to get the products')
        }
    },


    getProduct: async(req,res)=>{
        try {
            const products = await Product.findById(req.params.id)
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json('filed to get the products')
            
        }  
    },

    searchProduct: async (req, res) => {
        try {
          const query = req.params.key;
        
          const products = await Product.find({$text:{ $search: query }})
    
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json('Failed to get products');
          console.log(error)
        }
      }
}