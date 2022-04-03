const User = require('../models/userModel')

const getUsers = async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    msg: 'لیست کاربران',
    data: users
  })
}

const addUser = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { first_name, last_name, email, password } = req.body
    const newUser = new User({
      first_name,
      last_name,
      email,
      password
    })
    await newUser.save()
    res.status(201).send({
      success: true,
      msg: 'کاربر جدید با موفقیت اضافه شد'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser
}
