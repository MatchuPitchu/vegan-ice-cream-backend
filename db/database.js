import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// If MongoDB connection err
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))