import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URI)

// If MongoDB connection err
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
