'use strict';

module.exports = (db) => {

    const BaseController = require('./base')();

    class BooksController extends BaseController {

        async list(req, res, next) {
            try {
                const user = await db.models.User.findById(req.user._id);

                let filters = {
                    institutions: {
                        $in: user.institutions
                    }
                };

                const results = await db.models.Book.find(filters);

                const response = {
                    books: results
                };

                return this.sendSuccessResponse(req, res, response);
            } catch (error) {
                return this.sendErrorResponse(req, res, error);
            }
        }
    }

    return BooksController;
};