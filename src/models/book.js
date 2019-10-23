'use strict';

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;

    const Book = new Schema({
        isbn: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        institutions: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Institution'
        }]
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    return Book;
};