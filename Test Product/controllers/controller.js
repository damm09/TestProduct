const {User} = require('../models/index');
const jwt = require('jsonwebtoken');
const { compareSync } = require('bcryptjs');
const { Op } = require('sequelize');

class Controller {
    static async handleRegister(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const {company, email, password,checkPassword,companyLabel} = req.body
            if (password !== checkPassword) {
                throw {name : 'passwords are not the same'}
            }
            const data = await User.create({
                company,
                email,
                password,
                companyLabel,
            })
            res.status(201).json({
                id:data.dataValues.id,
                email:data.dataValues.email
            })

        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            if (!email||!password) {
                throw {name: "Email / Pass is wrong"}
            }
            const data = await User.findOne({
                where: {
                    [Op.or]: {
                        email
                    } 
                }
            })
            if (!data) {
                throw {name: `Email or Username and Password is Invalid`}
            }
            const validPass = compareSync(password, data.password)
            if (!validPass) {
                throw {name: `Email or Username and Password is Invalid`}
            }
            const payload = {
                id: data.id,
                email: data.email
            }
            const access_token = jwt.sign(payload, "endmysufferplease")
            res.status(200).json({
                statusCodes: 200,
                access_token,
                username: data.company
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller