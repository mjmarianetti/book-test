'use strict';

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;

    const Institution = new Schema({
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        emailDomain: {
            type: String,           
            required: true
        }
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    return Institution;
};