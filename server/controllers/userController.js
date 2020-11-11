const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    User
    .find({ email: req.body.email })
    .then(users => {
        if (users.length > 0) {
            return res.status(409).json({
                message: 'Mail exists'
            });

        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        ...err
                    });
                } else {
                    const user = new User({
                        email: req.body.email,
                        restaurantName: req.body.restaurantName,
                        restaurantAddress: req.body.restaurantAddress,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({
                            ...err
                        });
                    });
                }
            });
        }
    });
};

exports.logIn = (req, res, next) => {
    User
    .find({ email: req.body.email })
    .then(users => {
        if (users.length < 1) {
            return res.status(401).json({
                message: 'Auth Failed'
            });
        }
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
            if (result) {
                const token = jwt.sign(
                    {
                        userId: users[0]._id,
                        email: users[0].email
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                return res.status(200).json({
                    message: 'Auth Success',
                    token: token,
                    id: users[0]._id
                });
            }
            return res.status(401).json({
                message: 'Auth Failed'
            });
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            ...err
        });
    });
};
