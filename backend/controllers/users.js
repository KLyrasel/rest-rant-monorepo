const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db
// passwordDigest is from the user model
router.post('/', async (req, res) => {
    let { password, ...rest } = req.body;
    const user = await User.create({
        ...rest,
        passwordDigest: await bcrypt.hash(password, 10)
    })
    res.json(user)
})


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router