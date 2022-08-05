require('dotenv').config()
const mongoose = require("mongoose")
const express = require('express')

// express app 
const app = express()
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// Check if there is a body and attachs to request object
app.use(express.json())

// middleware that will fire on every request
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// When we fire a request to this path run the workoutRoutes
// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port`, process.env.PORT)
    })

  }).catch((error) => {
    console.log(error)
  })

