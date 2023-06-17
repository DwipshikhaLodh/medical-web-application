require('dotenv').config();
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const Doctors = require('../models/doctor');
const Patients = require('../models/patient');
const jwt = require('jsonwebtoken');
const cookie_parser = require('cookie-parser');

router.use(cookie_parser());

// MongoDB Connection

const authenticateDoctor = async (req, docName, docPassword, done) => {
  console.log(docName);
  const doctor = await Doctors.findOne({ name: docName });
  console.log(doctor);
  if (!doctor) {
    return done(null, false, { message: 'No doctor with that name' });
  }

  try {
    const passwordMatch = await bcrypt.compare(docPassword, doctor.hashPassword);
    if (passwordMatch) {
      console.log('Logged In Successfully');
      return done(null, doctor, { message: 'Logged In Successfully' });
    } else {
      return done(null, false, { message: 'Password Incorrect' });
    }
  } catch (e) {
    console.log(e);
    return done(e);
  }
};

const authenticatePatient = async (patName, patPassword, done) => {
  console.log(patName);
  const patient = await Patients.findOne({ name: patName });
  console.log(patient);
  if (!patient) {
    return done(null, false, { message: 'No patient with that name' });
  }

  try {
    const passwordMatch =await bcrypt.compare(patPassword, patient.password);
    if (passwordMatch) {
      console.log('Logged In Successfully');
      return done(null, patient, { message: 'Logged In Successfully' });
    } else {
      return done(null, false, { message: 'Password Incorrect' });
    }
  } catch (e) {
    console.log(e);
    return done(e);
  }
};

router.get('/doctor', (req, res) => {
  res.render('login/doctor');
});

router.post('/doctor', async (req, res) => {

  const doctor = await Doctors.findOne({ doctorSpecId : req.body.docId });
  console.log(`doctor: ${doctor}, doctor's password: ${doctor.password}`);

  const isMatched = bcrypt.compare(req.body.docPassword, doctor.password);
  console.log(`Password Matched? ${isMatched}`);

  try{

    const token = await doctor.generateAuthToken();
    console.log(`the token generated is ${token}`);

    res.cookie("jwt", token, {
      httpOnly: true,
      expires : new Date(Date.now() + 30000) 
    });


    if(isMatched){
      console.log('logged in');
      res.redirect('/dashboard/doctor');
    }else{
      console.log('error while login');
    }

  }catch(e){
    console.log(e);
  }

})

router.get('/patient', (req, res) => {
  res.render('login/patient');
});

router.post('/patient', async (req, res) => {

  const patient = await Patients.findOne({ email : req.body.patEmail });
  console.log(`Patient is ${patient}, patient's password: ${patient.password} & ${req.body.patPassword}`);

  const isMatched = bcrypt.compare( patient.password, req.body.patPassword );
  console.log(`Password matched? ${isMatched}`);

  try{

    const token = await patient.generateAuthToken();
    console.log(`the token generated is ${token}`);

    res.cookie("jwt", token, {
      httpOnly: true,
      expires : new Date(Date.now() + 30000) 
    });

    if(isMatched){
      console.log("logged in");
      res.redirect('/dashboard/patient');
    }else{
      console.log('error while login');
    }

  }catch(e){
    console.log(e);
  }

});

module.exports = router;