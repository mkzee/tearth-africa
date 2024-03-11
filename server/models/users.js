import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import validator from "validator"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [ true, 'Please enter a valid email address' ],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  username: {
    type: String,
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.method('comparePassword', async function (submittedPassword, storedPassword) {
  return bcrypt.compare(submittedPassword, storedPassword)
})

const User = mongoose.model('User', userSchema)

export default User