if (process.env.NODE_ENV !== 'production'){ // means when we are in development
    require('dotenv').config()
}

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const express = require('express');
const router = express.Router();
const passport = require('passport')
const initializePassport = require('../passport-config')
const flash = require('express-flash')
const session = require('express-session')
const Doctors = require('../models/doctor')
const Patients = require('../models/patient')

const authenticateUser = async (docName, docPassword, done) => {
    console.log(docName)
    const user = await Doctors.find({ name : docName});
    console.log(user[0])
    if(user == null){
        return done(null, false, { message : 'No doctor with that name'})
    }

    try{
        console.log(docPassword, user[0].password)
        if(bcrypt.compare(docPassword, user[0].hashPassword, (err) => {
            if(err){
                console.log(err);
                return err;
            }

            console.log('Logged In Successfully')
            return done(null, user[0], {message : 'Logged In Successfully'});
        }))
        
        return done(null, false, { message : 'Password Incorrect'})
        
    }catch(e){
        console.log(e)
        return done(e)
    }

}

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
    secret : process.env.SESSION_SECRET, // key that will encrypt everything for us
    resave : false,
    saveUninitialized : false
}))

router.use(passport.initialize())
router.use(passport.session())


//passport to define authentication strategy
// for doctor
passport.use(new LocalStrategy( { usernameField : 'docName', passwordField : 'docPassword' }, authenticateUser))
//authenticateUser() sends done(null, user) to serializeUser() 

// for patient
passport.use(new LocalStrategy( { usernameField : 'patName', passwordField : 'patPassword' }, authenticatePatient))

router.use(flash())

// to maintain login session, passport serializes & deserializes
passport.serializeUser((user, done) => { 
    console.log("serializing")
    console.log(user)
    console.log(user.id)

    return done(null, user) 
})

passport.deserializeUser( async (user, done) => {
    console.log("deserializing");
    console.log()
    try{
        //const user = await Doctors.findById(id);
        console.log(user);
        done(null, user);
    }catch(err){
        console.log(err);
        done(err, null);
    }
})

router.get('/doctor', (req, res) => {
    res.render('login/doctor')
})

router.post('/doctor', passport.authenticate('local', {
    successRedirect : '/dashboard/doctor',
    failureRedirect : '/login/doctor',
    failureFlash : true
}))

router.get('/patient', (req, res) => {
    res.render('login/patient')
})

router.post('/patient', passport.authenticate('local', {
    successRedirect : '/dashboard/patient',
    failureRedirect : '/login/patient',
    failureFlash : true
}))

module.exports = router;

//async doctor => await doctor.name === docName
//id => doctor.id === id
//initializePassport(passport, docName => Doctors.find({ name : docName})
//, id => Doctors.find({ id : id}))



//async (doctorSpecId, done) => { 
//    console.log(doctorSpecId)
//    const user = await Doctors.find({ doctorSpecId : doctorSpecId});
//    console.log('after')
//    console.log(user)
//    return done(null, user) 

//Doctors.findById(id).then((user) => {
//    done(null, user)
//})
//console.log("after if")