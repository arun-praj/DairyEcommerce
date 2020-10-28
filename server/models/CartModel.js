import mongoose from "mongoose"

const itemSchema = mongoose.Schema({
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
   },
   //    quantity: {
   //       type: Number,
   //       default: 1,
   //    },

   //    description: {
   //       type: String,
   //    },
   //    name: {
   //       type: String,
   //    },
   //    price: {
   //       type: String,
   //    },
   //    photo: {
   //       type: String,
   //       default: null,
   //    },
})

const cartSchema = mongoose.Schema(
   {
      item: [itemSchema],
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },

   { timestamps: true }
)

const Cart = mongoose.model("Cart", cartSchema)

export default Cart
