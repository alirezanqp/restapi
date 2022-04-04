const mongoose = require('mongoose')
const User = require('../models/userModel')

const getUsers = async (req, res, next) => {
  let projection = {}
  // eslint-disable-next-line no-prototype-builtins
  if (req.query.hasOwnProperty('fields')) {
    projection = req.query.fields.split(',').reduce((total, current) => {
      return { [current]: 1, ...total }
    }, {})
  }

  const perPage = req.query.limit || 10
  const page = req.query.page || 1
  const userCount = await User.count()
  const totalPages = Math.ceil(userCount / perPage)
  const offset = (page - 1) * perPage

  const users = await User.find({}, projection).limit(perPage).skip(offset)
  res.status(200).json({
    msg: 'لیست کاربران',
    data: { users },
    meta: {
      page: page,
      limit: perPage,
      pages: totalPages,
      next: hasNextPage(page, totalPages) ? `${process.env.APP_URL}/api/users?page=${+page + 1}` : null,
      prev: hasPrevPage(page) ? `${process.env.APP_URL}/api/users?page=${page - 1}` : null
    }
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

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 400,
        msg: 'id not valid!'
      })
    }
    const { n, nModefied } = await User.findByIdAndUpdate(id, { ...req.body })
    if (n == null || nModefied === 0) {
      throw new Error('عملیات بروزرسانی با خطا مواجه شد')
    }
    return res.status(200).send({
      msg: 'کاربر موردنظر با موفقیت آپدیت شد',
      data: nModefied
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

const hasNextPage = (page, totalPages) => {
  return page < totalPages
}

const hasPrevPage = (page) => {
  return page > 1
}

module.exports = {
  getUsers,
  addUser,
  getOneUser,
  deleteUser,
  updateUser
}
