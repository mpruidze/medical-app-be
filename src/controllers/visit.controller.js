const {
    allVisits,
    newVisit,
    updatedVisit,
    deletedVisit,
    } = require('../data/visit.data');

// get all visits
module.exports.allVisits = async (req,res) => {
    try {
        if (req.query.hasOwnProperty('fromDate') && req.query.hasOwnProperty('toDate')) {
            const result = await allVisits(req.user, req.query);
            res.send(result);
        } else {
            throw {
                message: "Error in query syntax",
                error: "Bad Request",
                status: '400',
            }
        }
    } catch (error) {
        if (error.status == '400') {
            res.status(error.status)
                .send(error);
        } else {
            res.status('500')
                .send({
                    message: "Internal server error",
                    error: "Internal server",
                    status: '500',
                });
        }
};
}

// create a new Visit
module.exports.newVisit = async (req,res) => {
    try {
            if (typeof req.body.username == 'string' && typeof req.body.doctorId == 'string' && typeof req.body.complaints == 'string' && typeof req.body.date == 'string' ) {
            const result = await newVisit(req, res);
            res.send(result);
        } else {
            throw {
                message: "Invalid fields type",
                error: "Bad Request",
                status: '400',
            }
        }
    } catch (error) {
        if (error.status == '400') {
          res.status(error.status)
             .send(error);
        } else {
          res.status('500')
             .send({
                message: error.message,
                error: "Internal server",
                status: '500',
             });
        }

    }
};

// update an Visit
module.exports.updatedVisit = async (req,res) => {
    try {
        if (typeof req.body.username == 'string' && typeof req.body.doctorId == 'string' && typeof req.body.complaints == 'string' ) {
            const result = await updatedVisit(req, res);
            res.send(result);
        } else {
            throw {
                message:"Invalid fields type",
                error: "Bad Request",
                status: '400',
            }
        }
    } catch (error) {
        if (error.status == '400') {
            res.status(error.status)
                .send(error);
        } else {
            res.status('500')
                .send({
                    message: "Internal server error",
                    error: "Internal server",
                    status: '500',
                });
        }
    }
};

// delete an Visit
module.exports.deletedVisit = async (req,res) => {
    try {
        if (req.params.id && req.params.id.length >= 24) {
            const result = await deletedVisit(req, res);
            res.send(result);
        } else {
            throw {
                message: "Id not provided",
                error: "Bad Request",
                status: '400',
            }
        }
    } catch (error) {
        if (error.status == '400') {
            res.status(error.status)
               .send(error);
        } else {
            res.status('500')
                .send({
                    message: "Internal server error",
                    error: "Internal server",
                    status: '500',
                });
        }
    }
};
