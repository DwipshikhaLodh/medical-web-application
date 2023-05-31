const mongoose = require('mongoose')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const {JSDOM} = require('jsdom')

const dompurify = createDomPurifier(new JSDOM().window) //sanitize the html through JSDOM().window object

const legitDoctorSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String
    },
    doctorSpecId : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model('LegitDoctors', legitDoctorSchema)