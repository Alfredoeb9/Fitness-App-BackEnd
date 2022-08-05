const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

// Basic Schema that checks if the data structure
// has the proper types we specify here
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

// Static signup method
userSchema.statics.signup = async function(firstName, lastName, email, password) {

  // Find an email within the database
  const exists = await this.findOne({ email })

  // if it exists then throw error
  if (exists) {
    throw Error('Email already in use')
  }

  // SALT: attaches a random string at the end of the password to prevent hackers for password cracking
  // generate salt
  const salt = await bcrypt.genSalt(10)

  // create a has and attach password + hash
  const hash = await bcrypt.hash(password, salt)


  const user = await this.create({ firstName, lastName, email, password: hash })

  return user

}

// Create a model that lets us interact with the workout collections depending on the schema. 
module.exports = mongoose.model("User", userSchema)