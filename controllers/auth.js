const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(() => {
            res.status(201).json({
                message: 'User created successfully'
            })
        }).catch(error => {
            res.status(409).json({
                error
            })
        })
    }).catch(error => {
        res.status(500).json({
            error
        })
    })
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}).then(user => {
        if(!user) {
            return res.status(404).json({
                error
            });
        }
        bcrypt.compare(req.body.password, user.password).then(valid => {
            if(!valid) {
                return res.status(404).json({
                    error
                });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    process.env.JWT_SECRET_KEY,
                    {expiresIn: '24h'}
                )
            });
        }).catch(error => {
            res.status(404).json({
                error
            })
        })
    }).catch(error => {
        res.status(404).json({
            error
        })
    })
};