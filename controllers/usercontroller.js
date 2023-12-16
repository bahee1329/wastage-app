const User = require('../models/User')

module.exports={
    deleteUser: async(req,res)=>{
        try {
           await User.findByIdAndDelete(req.params.id)

           res.status(200).json("sucessfully delete")
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getUser :async(req,res)=>{
        try {
            const user = await User.findById(req.params.id)
            
            if(!user){
               return  res.status(400).json("user not exists ")
            }
            const { password,__v,createdAt,updatedAt,...userData} = user._doc

            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}