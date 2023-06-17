const express = require('express')
const router = express.Router()
const passport = require('passport-local')
const jwt = require('jsonwebtoken')
const cookie_parser = require('cookie-parser');
const Doctors = require('../models/doctor');
const Patients = require('../models/patient');

router.use(cookie_parser());

router.get('/doctor', async (req, res) => {

    const token = req.cookies.jwt;
    console.log(`the cookie in doctor is : ${token}`);
    const userverify = jwt.verify(token, process.env.DOCTOR_SECRET_KEY);
    console.log(userverify);

    const doctor = await Doctors.find({ _id : userverify._id});
    console.log(doctor[0].name);

    res.render('dashboard/doctor', {name : doctor[0].name});
})

router.get('/docDashPatients', async (req, res) => {
    const token = req.cookies.jwt;
    console.log(`the cookie in docDashPatient is : ${token}`);
    const userverify = jwt.verify(token, process.env.DOCTOR_SECRET_KEY);
    console.log(userverify);

    const doctor = await Doctors.find({ _id : userverify._id});
    console.log(doctor[0].name);

    res.render('dashboard/docDashPatients', { name : doctor[0].name});
})

router.get('/docDashSlots', async (req, res) => {
    const token = req.cookies.jwt;
    console.log(`the cookie in docDashSlots is : ${token}`);
    const userverify = jwt.verify(token, process.env.DOCTOR_SECRET_KEY);
    console.log(userverify);

    const doctor = await Doctors.find({ _id : userverify._id});
    console.log(doctor[0].name);

    res.render('dashboard/docDashSlots', { name : doctor[0].name});
})

router.get('/docDashPatient_PatientInfo', (req, res) => {
    res.render('dashboard/docDashPatient_PatientInfo')
})

router.get('/docDashEdit', async (req, res) => {
    const token = req.cookies.jwt;
    console.log(`the cookie in docDashEdit is : ${token}`);
    const userverify = jwt.verify(token, process.env.DOCTOR_SECRET_KEY);
    console.log(userverify);

    const doctor = await Doctors.find({ _id : userverify._id});
    console.log(doctor[0].name);

    res.render('dashboard/docDashEdit', { name : doctor[0].name, speciality : doctor[0].speciality, email : doctor[0].email, age : doctor[0].age, contact_no : doctor[0].contact_no , qual : doctor[0].qualification});
})

router.get('/docDashEditForm', async (req, res) => {
    const token = req.cookies.jwt;
    console.log(`the cookie in docDashEditForm is : ${token}`);
    const userverify = jwt.verify(token, process.env.DOCTOR_SECRET_KEY);
    console.log(userverify);

    const doctor = await Doctors.find({ _id : userverify._id});
    console.log(doctor[0].name);

    res.render('dashboard/docDashEditForm', { name : doctor[0].name , email : doctor[0].email, speciality : doctor[0].speciality })
})

router.post('/docDashEditForm', async (req, res) => {

    const token = req.cookies.jwt;
    console.log(`the cookie is : ${token}`);
    const userverify = jwt.verify(token, process.env.DOCTOR_SECRET_KEY);
    console.log(userverify);

    let doctor = await Doctors.findOne({ doctorSpecId : req.body.docId });
    console.log(`unchanged ${doctor}`);
    doctor.name = req.body.docName;
    doctor.speciality = req.body.docSpec;
    doctor.email = req.body.docEmail;
    doctor.contact_no = req.body.docContact;
    doctor.age = req.body.docAge;
    doctor.qualification = req.body.docQual;

    doctor = await doctor.save();
    console.log(`edited ${doctor}`);

    res.render('dashboard/docDashEdit', { name : doctor.name , speciality : doctor.speciality, email : doctor.email , contact_no : doctor.contact_no , age : doctor.age , qual : doctor.qualification });

})

router.get('/patient', async (req, res) => {
    const token = req.cookies.jwt;
    console.log(`the cookie is : ${token}`);
    const userverify = jwt.verify(token, process.env.PATIENT_SECRET_KEY);
    console.log(userverify);

    const patient = await Patients.find({ _id : userverify._id});
    console.log(patient[0].name);
    res.render('dashboard/patient')
})
module.exports = router;