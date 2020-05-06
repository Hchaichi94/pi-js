const User = require('../models/user')


const department = async (req, res, next) => {
    try {
        const email = req.body.manager
        const user = await User.findOne({ "email": email })
        if (!user.roles.includes("department_manager")) {
            await User.findOneAndUpdate(
                { "email": email },
                { $push: { "roles": "department_manager" } },
                { returnNewDocument: true })
        }
        try {
            user.save()
        } catch (e) {
        }
        if (!user) {
            res.status(401).send("user not found")
        }
        req.body.manager = user
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
}

module.exports = department