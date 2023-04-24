const controller = require('./controller')
const Router = require('express').Router
const passport = require('passport')
require('../../services/passport')(passport);
const router = new Router()

router.route('/')
  .get(passport.authenticate('jwt',{session : false}),(...args) => controller.find(...args))
  .post((...args) => controller.create(...args))

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args))

module.exports = router
