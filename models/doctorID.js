const mongoose = require('mongoose')
const createDomPurifier = require('dompurify')
const {JSDOM} = require('jsdom')

const doctorIDSchema = new mongoose.Schema({
    docName : {
        type : String,
        required : true
    },
    docSpecID : {
        type : String,
        required : true,
        unique : true
    }
})

module.exports = mongoose.model('DoctorID', doctorIDSchema)