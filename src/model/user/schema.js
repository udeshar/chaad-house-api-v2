const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  password : { type: String, required: true },
  username : {type: String, required: true},
  access_token : [
    {type: String, required : true}
  ]
})

module.exports = userSchema
