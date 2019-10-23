'use strict';

const bcrypt = require('bcryptjs');

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;

    const ROLES = ['student', 'academic', 'administrator'];

    const User = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ROLES,
            required: true
        },
        institutions: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Institution'
        }],
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    User.pre('save', async function (next) {
        const user = this;
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    });

    User.methods.isValidPassword = async function (password) {
        const user = this;
        const compare = await bcrypt.compare(password, user.password);
        return compare;
    }

    return User;
};