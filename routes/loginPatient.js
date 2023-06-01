if (process.env.NODE_ENV !== 'production'){ // means when we are in development
    require('dotenv').config()
}

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const express = require('express')
const router = express.Router()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const Patients = require('../models/patient')

const authenticatePatient = async (patName, patPassword, done) => {
    console.log(patName)
    const patient = await Patients.find({ name : patName});
    console.log(patient[0])
    if(patient == null){
        return done(null, false, { message : 'No patient with that name'})
    }

    try{
        console.log(patPassword, patient[0].password)
        if(bcrypt.compare(patPassword, patient[0].password, (err) => {
            if(err){
                console.log(err);
                return err;
            }

            console.log('Logged In Successfully')
            return done(null, patient[0], {message : 'Logged In Successfully'});
        }))
        
        return done(null, false, { message : 'Password Incorrect'})
        
    }catch(e){
        console.log(e)
        return done(e)
    }
}

//initialize middleware 
router.use(session({ //sets session to http
    secret : process.env.SESSION_SECRETPAT, // key that will encrypt everything for us
    resave : false,
    saveUninitialized : false
}))

router.use(passport.initialize())
router.use(passport.session())

// for patient
passport.use(new LocalStrategy( { usernameField : 'patName', passwordField : 'patPassword' }, authenticatePatient))

router.use(flash())

// to maintain login session, passport serializes & deserializes
passport.serializeUser((patient, done) => { 
    console.log("serializing")
    console.log(patient)
    console.log(patient.id)

    return done(null, patient) 
})

passport.deserializeUser( async (patient, done) => {
    console.log("deserializing");
    console.log()
    try{
        //const user = await Doctors.findById(id);
        console.log(patient);
        done(null, patient);
    }catch(err){
        console.log(err);
        done(err, null);
    }
})

router.get('/patient', (req, res) => {
    res.render('loginPatient/patient')
})

router.post('/patient', passport.authenticate('local', {
    successRedirect : '/dashboard/patient',
    failureRedirect : '/loginPatient/patient',
    failureFlash : true
}))

module.exports = router;