import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const authSchema = mongoose.Schema(
   {
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
         match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
         ],
      },
      firstName: {
         type: String,
         required: [true, "First name is required"],
         minlength: 2,
      },
      lastName: {
         type: String,
         required: [true, "Last name is required"],
         minlength: 2,
      },
      contact: {
         type: Number,
         required: [true, "Contact number is required"],
         minlength: 7,
      },
      profilePic: {
         type: String,
      },
      status: {
         type: "String",
         enum: ["active", "deactivated"],
         default: "active",
      },
      password: {
         type: String,
         required: [true, "Please add a Password"],
         minlength: 6,
         select: false, // When we get a user its not gonna return password
      },
      subscribeToNews: {
         type: Boolean,
         default: false,
      },
      points: {
         type: [Number],
      },
      role: {
         type: String,
         enum: ["user", "admin"],
         default: "user",
      },
   },
   {
      timestamps: true,
   }
)

authSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password)
}

authSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next()
   }
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", authSchema)

export default User
