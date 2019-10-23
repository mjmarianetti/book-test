'use strict';


module.exports = () => {

    const ResponseHelper = require('../helpers/response-helper')();

    class BaseController {

        constructor() {}

        sendErrorResponse(req, res, error) {
            return ResponseHelper.internalError(req, res, error);
        }

        sendSuccessResponse(req, res, data) {
            return ResponseHelper.success(req, res, data);
        }

    }

    return BaseController;
};