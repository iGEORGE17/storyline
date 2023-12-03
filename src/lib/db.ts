import mongoose from "mongoose"

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGODB_URL!)
        .then(() => console.log(`Database connected...`))
        .catch((err) => console.log({ err: err }))
}

export default dbConnect