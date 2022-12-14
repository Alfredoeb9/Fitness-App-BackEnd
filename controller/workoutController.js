const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  // Grab all collection in WorkoutModel from db from newest
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}


// get a single workout
const getWorkout = async (req, res) => {

  // grab the id of the params of the URL
  const { id } = req.params

  // Run a security check to make sure id is valid 
  // using mongoose
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No Such Workout'})
  }

  const workout = await Workout.findById(id)

  // if not error is found then error out
  if (!workout) {
    return res.status(400).json({error: "No such workout"})
  }

  res.status(200).json(workout)
}


// create a new workout

const createWorkout = async (req, res)  => {
    // grab all request from the body
    const {title, load, reps} = req.body

    // Handling error responses,
    // holding all error respones on a empty array
    let emptyFields = []

    // if any of these values are null then push error 
    // into the emptyFields = [] array
    if(!title) {
    emptyFields.push('title')
    }
    if(!load) {
    emptyFields.push('load')
    }
    if(!reps) {
    emptyFields.push('reps')
    }

    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

   try {
     // try to create a new workout document to db
     // create a new document with these 3 properties
     const workout = await Workout.create({ title, load, reps })
     res.status(200).json(workout)
   } catch ( error ) {
     res.status(400).json({error: error.message})
   } 
}


// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

   if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No Such Workout'})
   }

   const workout = await Workout.findOneAndDelete({_id: id})

   if(!workout) {
    res.status(400).json({error: 'No such workout'})
   }

   res.status(200).json(workout)
}


// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!workout) {
    return res.status(400).json({ error: 'No such workout'})
  }

  res.status(200).json(workout)
}


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout

}