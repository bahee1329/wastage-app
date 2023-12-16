const Product = require('../models/Products');
const Card = require('../models/Card');

module.exports = {
    addCard:async(req,res)=>{
        const  {userId,cardItem,quantity}= req.body;

        try {
            const card = await Card.findOne({userId})

            if(card){
                const existingCard = card.products.find(
                    (product)=>product.cardItem.toString() === cardItem
                );

                if(existingCard){
                    existingCard.quantity +=1
                }else{
                    card.products.push({cardItem,quantity})
                }

                await card.save();
                res.status(200).json("product added ")
            }else{
                const newCard = new Card({
                    userId,
                    products:[{
                        cardItem,
                        quantity:quantity
                    }]
                })

                await newCard.save();
                res.status(200).json("product added ")
            }
        } catch (error) {
            
            res.status(500).json(error)
        }
    },

    getCard:async(req,res)=>{
        const userId = req.params.id;

        try {
            const card = await Card.find({userId})
                  .populate('products.cardItem',"_id title supplier price imageUrl")


            res.status(200).json(card)      
        } catch (error) {
            res.status(500).json(error)
        }
    },

    decrementCarditem:async (req,res)=>{
        const {userId,cardItem}= req.body;

        try {
            const card = await Card.findOne({userId});

            if(!card){
                return res.status(404).json("card not found")
            }

            const existCard = card.products.find(
                (product)=>product.cardItem.toString() === cardItem
            );

            if(!existCard){
                return res.status(404).json("product not found")
            }

            if(existCard.quantity ===1){
                card.products =card.products.filter(
                    (product)=>product.cardItem.toString() !== cardItem
                )
            }else{
                existCard.quantity -=1;
            }

            await card.save()

            if(existCard.quantity === 0){
                await card.updateOne(
                    {userId},
                    {$pull:{products:{cardItem}}}
                )
            }
            
            res.status(200).json("product updated")

        } catch (error) {
            res.status(500).json(error)
        }
         
    },

    deleteCard:async(req,res)=>{
        const cardItemId=req.params.cardItemId;

        try {
            const updatedCard = await Card.findOneAndUpdate(
                {'products._id':cardItemId},
                {$pull:{products:{_id:cardItemId}}},
                {new:true}
            );
            
            if(!updatedCard){
                return res.status(404).json("card not found")
            }
            

            res.status(200).json(updatedCard)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}