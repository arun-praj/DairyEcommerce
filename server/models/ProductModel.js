import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      rating: {
         type: Number,
         required: true,
      },
      comment: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const productSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: 2,
         match: [/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm, "Invalid product name"],
      },
      description: {
         type: String,
         required: [true, "Description is Required"],
         maxlength: [500, "Description can not be more than 500 characters"],
      },
      price: {
         type: Number,
         required: [true, "Price is Required"],
         default: 0,
      },
      category: {
         type: String,
         required: [true, "Category is Required"],
      },
      image: {
         type: String,
         required: true,
      },
      reviews: [reviewSchema],
      rating: {
         type: Number,
         require: true,
         defailt: 0,
      },
      numReviews: {
         type: Number,
         required: true,
         default: 0,
      },
      countInStock: {
         type: Number,
         required: true,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
