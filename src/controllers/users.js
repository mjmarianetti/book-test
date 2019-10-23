'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config/app');

module.exports = (db, passport) => {

    const BaseController = require('./base')();

    class UsersController extends BaseController {

        async create(req, res, next) {


            try {
                const domain = req.body.email.replace(/.*@/, "");

                console.log("Finding institution");
                const institution = await db.models.Institution.findOne({
                    emailDomain: domain
                });

                if (!institution) {
                    throw new Error("Institution not found");
                }

                console.log("Creating user");
                const user = await db.models.User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    institutions: [institution.id]
                });

                return this.sendSuccessResponse(req, res, {
                    user: user
                });
            } catch (error) {
                return this.sendErrorResponse(req, res, error);
            }
        }

        async signin(req, res, next) {

            passport.authenticate('login', async (err, user, info) => {
                try {
                    if (err || !user) {
                        console.error(err);
                        return this.sendErrorResponse(req, res, {
                            message: 'An Error ocurred'
                        });
                    }
                    req.login(user, {
                        session: false
                    }, async (error) => {
                        if (error) {
                            return this.sendErrorResponse(req, res, error);
                        }

                        const body = {
                            _id: user._id,
                            email: user.email
                        };
                        const token = jwt.sign({
                            user: body
                        }, config.key);

                        return this.sendSuccessResponse(req, res, {
                            token
                        });
                    });
                } catch (error) {
                    return this.sendErrorResponse(req, res, error);
                }
            })(req, res, next);
        }

    }

    return UsersController;
};