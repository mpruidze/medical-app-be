const mongoose = require('mongoose');
const {Schema} = mongoose;

const visitSchema = new Schema({
    username: {
        type: String,
        required: true
      },
    doctorId: {
        type: String,
        required: true
      },
    date: {
        type: Date,
        required: true,
        validate: {
          validator: function (v) {
            return (
              v && // check that there is a date object
              v.getTime() > Date.now() + 24 * 60 * 60 * 1000 &&
              v.getTime() < Date.now() + 365 * 24 * 60 * 60 * 1000
            );
          },
          message:
            "A visit must be at least 1 day from now and not more than 1 year.",
        }
      },
    complaints: {
        type: String,
        required: true
      },
    userId: {
        type: String,
        required: true,
      },
});

visitSchema.set('timestamps', true);
const Visit = mongoose.model('visits', visitSchema);

module.exports = Visit;
