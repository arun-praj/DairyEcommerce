import mongoose from "mongoose"

const connect = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false,
      })
      console.log(`Database connected : ${conn.connection.host}`)
   } catch (e) {
      console.log(`Database disconnected : ${e}`)
   }
}

export default connect
