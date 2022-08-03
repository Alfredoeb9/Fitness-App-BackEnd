const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Basic Schema that checks if the data structure
// has the proper types we specify here
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  }, 
  load: {
    type: Number,
    required: true
  }
}, { timestamps: true })

// Create a model that lets us interact with the workout collections depending on the schema. 
module.exports = mongoose.model("Workout", workoutSchema)