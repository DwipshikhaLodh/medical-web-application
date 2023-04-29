const express = require('express');
const router = express.Router();

router.get('/doctor', (req, res) => {
    res.render('login/doctor')
})

router.get('/patient', (req, res) => {
    res.render('login/patient')
})

module.exports = router;