'use strict';

module.exports = () => {

    class ResponseHelper {

        static getErrorResponse() {
            return {
                status: 'error',
                message: "Internal server error"
            };
        }

        static internalError(req, res, error) {

            if (error) {
                console.error('internal server error', error);
            }

            const response = this.getErrorResponse();

            return res.status(500).json(response);
        }


        static unauthorized(req, res, error) {            

            const response = this.getErrorResponse();

            response.message = "unauthorized";
            return res.status(401).json(response);
        }

        static success(req, res, data) {

            console.log("SUCCESS", data);
            const response = {
                status: 'success',
                data: data
            };

            return res.status(200).json(response);
        }
    }

    return ResponseHelper;
}