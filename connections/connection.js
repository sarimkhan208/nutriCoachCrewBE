require('dotenv').config()
const mongoose = require('mongoose')
const connection = mongoose.connect(process.env.BASE_URL) 

module.exports = {connection}