const Doctor = require('../models/doctor.model');

module.exports.allDoctors = async () => {
    const Doctors = await Doctor.find({});
    return Doctors;
  };

module.exports.newDoctor = async (req, res) => {
  const doctor = new Doctor({
    doctorName: req.body.doctorName,
    specialty: req.body.specialty,
  });
  const newDoctor = await doctor.save();
  return newDoctor;
};
