import mongoose from "mongoose"

const orderSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      userName: {
         type: String,
      },
      contact: {
         type: Number,
      },
      email: {
         type: String,
      },
      orderItems: [
         {
            _id: {
               type: mongoose.Schema.Types.ObjectId,
               required: true,
               ref: "Product",
            },
            name: {
               type: String,
               required: true,
            },
            qty: {
               type: Number,
               required: true,
            },
            image: {
               type: String,
            },
            price: {
               type: Number,
               required: true,
            },
            decorated: {
               type: Boolean,
               default: false,
            },
            designSelected: {
               type: String,
            },
            designPrice: {
               type: Number,
               default: 0,
            },
            nameInDecoration: {
               type: String,
            },
         },
      ],
      shippingAddress: {
         region: {
            type: String,
            required: true,
         },
         city: {
            type: String,
            required: true,
         },
         area: {
            type: String,
            required: true,
         },
         country: {
            type: String,
            default: "Nepal",
         },
      },
      paymentMethod: {
         type: String,
         required: true,
         default: "Cash in delivery",
      },
      paymentResult: {
         id: {
            type: String,
         },
         status: {
            type: String,
         },
         updated_time: {
            type: String,
         },
         email: {
            type: String,
         },
      },
      orderStatus: {
         type: String,
         enum: [
            "Processing",
            "Packed for delivery",
            "Cancelled",
            "Delivered",
            "Failed",
         ],
         default: "Processing",
      },
      orderId: {
         type: String,
         default: null,
      },
      shippingPrice: {
         type: Number,
         required: true,
         default: 0.0,
      },
      totalPrice: {
         type: Number,
         required: true,
         default: 0.0,
      },
      isPaid: {
         type: Boolean,
         required: true,

         default: false,
      },
      paidAt: {
         type: Date,
      },
      dateToDeliver: {
         type: Date,
         default: Date.now(),
      },
      isDelivered: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   }
)

const Order = mongoose.model("Order", orderSchema)
export default Order
