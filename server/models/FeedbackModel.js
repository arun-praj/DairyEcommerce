import mongoose from "mongoose"

const feedbackSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: 2,
         match: [/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm, "Invalid product name"],
      },
      message: {
         type: String,
         required: [true, "Description is Required"],
         maxlength: [200, "Description can not be more than 500 characters"],
      },
      contact: {
         type: Number,
         maxlength: [7, "Number must be greater than 7"],
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
         match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
         ],
      },
   },
   {
      timestamps: true,
   }
)

const Feedback = mongoose.model("Feedback", feedbackSchema)
export default Feedback
