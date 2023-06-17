require('dotenv').config();
const mongoose = require('mongoose')
const slugify = require('slugify')
const jwt = require('jsonwebtoken')

const patientSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
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
    },
    tokens: [{
        token : String
    }]
})

patientSchema.methods.generateAuthToken = async function() {
    try{
        const token = jwt.sign({ _id : this._id.toString()}, process.env.PATIENT_SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token });
        console.log(`the token in patientschema ${token}`);
        await this.save();
        return token;
    }catch(e){
        console.log(`the error is ${e}`);
    }
}

patientSchema.pre('validate', function(next) {
    if(this.name){
        this.slug = slugify(this.name, { lower : true, strict : true})
    }
    
    next()
})

module.exports = mongoose.model('Patients', patientSchema)