import mongoose from "mongoose";

const userSchema = mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
         minlength: 2,
         match: [/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm, "Invalid firstname"],
      },
      firstName: {
         type: String,
         required: true,
         minlength: 2,
         match: [/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm, "Invalid firstname"],
      },
      email: {
         type: String,
         required: true,
         unique: true,
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
      },
      password: {
         type: String,
         required: [true, "Please add a Password"],
         minlength: 6,
         select: false,
      },
      status: {
         type: String,
         enum: ["active", "deactivated"],
         default: "active",
      },
      role: {
         type: String,
         enum: ["user", "admin", "superAdmin"],
         default: "user",
      },
   },
   {
      timestamps: true,
   }
);

const User = mongoose.model("User", userSchema);
export default User;
