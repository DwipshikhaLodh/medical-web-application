const mongoose = require('mongoose')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const {JSDOM} = require('jsdom')

const dompurify = createDomPurifier(new JSDOM().window) //sanitize the html through JSDOM().window object

const doctorSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String
    },
    email : {
        type : String,
        required : true
    },
    doctorSpecId : {
        type : Number,
        required : true,
        unique : true
    },
    speciality : {
        required : true,
        type : String
    },
    patients : [{ patientName : String, patientID : String}] 
    ,
    password : {
        type : String,
        required : true
    },
    slug : {
        type : String, 
        required : true,
        unique : true
    }
})

doctorSchema.pre('validate', function(next) {
    if(this.name){
        this.slug = slugify(this.name, { lower : true, strict : true})
    }
    
    next()
})

module.exports = mongoose.model('Doctors', doctorSchema)