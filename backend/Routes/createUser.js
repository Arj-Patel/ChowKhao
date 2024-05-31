const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post("/createUser", [
    body('email').isEmail(),
    body('password', 'Password must be atleast 5 characters long').isLength({ min: 5 }),
    body('name', 'Name must be atleast 3 characters long').isLength({ min: 3 })
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
            console.log(user);
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password must be atleast 5 characters long').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }
        if (req.body.password === user.password) {
            return res.json({ success: true });
        } else {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

    } catch {
        console.log("error");
        res.json({ success: false });
    }
})

module.exports = router;