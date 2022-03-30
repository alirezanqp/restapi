module.exports = new class {
  getUsers (req, res, next) {
    res.status(200).json({
      msg: 'ok'
    })
  }
}()
