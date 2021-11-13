const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    doctorName: { type: String, required: true, unique: true},
    specialty: { type: String, required: true},
});

module.exports = mongoose.model('doctors', DoctorSchema);
