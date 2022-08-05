const User = require('../models/userModel')

// login user
const loginUser =  async (req, res) => {
  res.json({msg: 'Login user'})
}


// sign up user
const signupUser =  async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    // fire up the signup function from the userModel
    const user = await User.signup(firstName, lastName, email, password)

    // return the users info down below
    res.status(200).json({ firstName, lastName, email, user })
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {signupUser, loginUser}