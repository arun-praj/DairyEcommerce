import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";

import Product from "../models/ProductModel.js";

//@description      Get all products
//@Routes           GET /api/products/
//@access           public
router.get(
   "/",
   asyncHandler(async (req, res) => {
      const products = await Product.find({});
      if (products.length > 0) {
         return res
            .json({
               count: products.length,
               data: products,
               message: "Products loaded",
            })
            .status(200);
      }
      res.json({
         message: "Product Database empty",
      });
   })
);

//@description      Get product by id
//@Routes           GET /api/products/:id
//@access           public
router.get(
   "/:id",
   asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
         return res
            .json({
               data: product,
               message: "Product loaded",
            })
            .status(200);
      }
      res.json({
         message: "Product not found",
      });
   })
);

//@description      Create/Update product
//@Routes           POST /api/products/
//@access           private / admin

router.post(
   "/",
   asyncHandler(async (req, res) => {
      const product = await Product.findOneAndUpdate(
         {
            name: req.body.name,
         },
         req.body,
         {
            new: true,
            upsert: true, // if not found then create new product using filter and update value
            rawResult: true,
            runValidators: true,
         }
      );
      if (!product) {
         res.json({
            message: "Already in database",
         }).status(400);
      }
      if (product.lastErrorObject.updatedExisting) {
         return res
            .json({
               data: product.value,
               message: " Updated Product",
            })
            .status(201);
      }
      res.json({
         data: product.value,
         message: "Added to database",
      }).status(201);
   })
);
export default router;
