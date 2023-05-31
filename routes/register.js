

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const alert = require('alert')
const Doctors = require('../models/doctor')
const LegitDoctors = require('../models/legitDoctor')
const Patients = require('../models/patient')

router.get('/doctor', (req, res) => {
    res.render('register/doctor')
})

router.post('/doctor', async (req, res) => {

    console.log('hi')

    let doctor = new Doctors({
        name : req.body.docName,
        email : req.body.docEmail,
        doctorSpecId : req.body.docId,
        speciality : req.body.docSpeciality,
        password : req.body.docPassword
    })

    try{

        const hashedPassword = await bcrypt.hash( req.body.docPassword, 10);
        doctor.hashPassword = hashedPassword;

        //code for verification

        const result = await LegitDoctors.find({ doctorSpecId : doctor.doctorSpecId});
        console.log('1')
        const resultName = await LegitDoctors.find({ name : doctor.name })
        console.log('2')
    
        if( result != null & result[0].name == doctor.name & result[0].doctorSpecId == doctor.doctorSpecId){
            console.log("entered")
            doctor = await doctor.save();
            res.redirect('/login/doctor');
            alert(`Welcome ${result[0].name} to TruHealth`)
        }else if( result != null & ( result[0].name != doctor.name | result[0].doctorSpecId == doctor.doctorSpecId )){
            alert(`Name & ID does not belong to same person`)
        }

    }catch(e){
        console.log(e.message)
        console.log(`ID does not exist`)
        alert(`ID does not exist`)
    }
})

router.get('/patient', (req, res) => {
    res.render('register/patient')
})

router.post('/patient', async (req, res) => {
    
    let patient = new Patients({
        name : req.body.patName,
        email : req.body.patEmail,
        contact_no : req.body.patNum,
        dob : req.body.patDOB,
        gender : req.body.patGender,
        password : req.body.patPassword
    })

    try{

        console.log("before hashing")
        const hashPatpassword = await bcrypt.hash( req.body.patPassword, 10);
        console.log("after hashing")
        patient.password = hashPatpassword;
        console.log("saving hashing")
        patient = await patient.save();
        console.log("after saving in db")
        res.redirect('/login/patient')

    }catch(e){
        console.log(e)
    }
})

module.exports = router;

// passport for login
// passport has various version for different types of login & passport-local does login via passwords 
// to persist the user across different pages we use session
// flash for displaying messages regarding login 