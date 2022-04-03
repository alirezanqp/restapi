const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')

const getUsers = async (req, res, next) => {
  let projection = {}
  if (req.query.hasOwnProperty('fields')) {
    projection = req.query.fields.split(',').reduce((total, current) => {
      return { [current]: 1, ...total }
    }, {})
  }
  const users = await User.find({}, projection)
  res.status(200).json({
    msg: 'لیست کاربران',
    data: users
  })
}

const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 400,
        msg: 'id not valid!'
      })
    }
    const user = await User.findOne({ _id: id })
    if (!user) {
      return res.status(404).send({ status: 404, msg: 'کاربر مورد نظر یافت نشد!' })
    }
    return res.status(200).send({
      user
    })
  } catch (error) {
    next(error)
  }
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

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 400,
        msg: 'id not valid!'
      })
    }
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).send({ status: 404, msg: 'کاربر مورد نظر یافت نشد!' })
    }
    return res.status(200).send({
      msg: 'کاربر موردنظر با موفقیت حذف شد',
      data: user
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  getOneUser,
  deleteUser
}
