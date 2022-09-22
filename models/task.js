const mongoose = require('mongoose')
const Schema = mongoose.Schema

const modelSchema = new Schema({
    name: {type: String, required: true},
    country: {type: String, required: false}
})

module.exports = mongoose.model('Task', modelSchema)