const mongoose = require('mongoose')
const slugify = require('slugify')

const patientSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    contact_no : {
        type : Number,
        require : true
    },
    dob : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    slug : {
        type : String,
        require : true,
        unique : true
    }
})

patientSchema.pre('validate', function(next) {
    if(this.name){
        this.slug = slugify(this.name, { lower : true, strict : true})
    }
    
    next()
})

module.exports = mongoose.model('Patients', patientSchema)