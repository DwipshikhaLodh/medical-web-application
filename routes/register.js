const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Doctors = require('../models/doctor')
const DoctorID = require('../models/doctorID')


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
        doctor.password = hashedPassword;

        //code for verification

        const doc = await Doctors.find({  name: 'kizi' })
        const docid = await DoctorID.find({  docName: 'Dr. Prabhati Purkayastha' })
        console.log(docid)
        console.log(doc)

        if(docid[0] != null){
            console.log("valid doctor")
        }else{
            console.log('invalid doctor')
        }

        if(doc[0] != null){
            console.log("valid doctor")
        }else{
            console.log('invalid doctor')
        }

        //doctor = await doctor.save()
        //console.log('after saving')

    }catch(e){
        console.log(e.message)
    }
})

router.get('/patient', (req, res) => {
    res.render('register/patient')
})

module.exports = router;