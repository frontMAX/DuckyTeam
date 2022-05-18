
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

const port = 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://frontmax:bomberbomber@test:5000/duckybase')
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    if (err) console.log(err)

    process.exit(1)
  }
}

connectDB()

app.listen(port, () => {
    console.log(`server running on port ${port}`)
  })