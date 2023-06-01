const express = require('express')
const router = express.Router()
const passport = require('passport-local')

router.get('/doctor', (req, res) => {
    console.log(req.body);
    console.log("user")
    res.render('dashboard/doctor', { user : req.body.user });
})

router.get('/docDashPatients', (req, res) => {
    res.render('dashboard/docDashPatients');
})

router.get('/docDashPatient_PatientInfo', (req, res) => {
    res.render('dashboard/docDashPatient_PatientInfo')
})

router.get('/patient', (req, res) => {
    console.log(req.body)
    res.render('dashboard/patient', { user : req.body.user})
})
module.exports = router;