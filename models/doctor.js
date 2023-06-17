require('dotenv').config();
const mongoose = require('mongoose')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const {JSDOM} = require('jsdom')
const jwt = require('jsonwebtoken');

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
    age : {
        type : String
    },
    qualification : {
        type : String
    },
    contact_no : {
        type : String
    },
    slug : {
        type : String, 
        required : true,
        unique : true
    },
    tokens : [{
        token : String
    }]
})

doctorSchema.methods.generateAuthToken = async function(){

    try{

        const token = jwt.sign({ _id : this._id.toString()}, process.env.DOCTOR_SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token });
        console.log(`token in doctorschema ${token}`);
        await this.save();
        return token;

    }catch(e){
        console.log(`error in doctorschema ${e}`);
    }

}

doctorSchema.pre('validate', function(next) {
    if(this.name){
        this.slug = slugify(this.name, { lower : true, strict : true})
    }
    
    next()
})

module.exports = mongoose.model('Doctors', doctorSchema)