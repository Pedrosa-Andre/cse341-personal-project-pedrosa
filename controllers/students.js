const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect');
const Api500Error = require('../error_handling/api500Error');

const getAllStudents = async (req, res, next) => {
  try {
    const students = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('students');
    const result = await students.find().toArray();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (error) {
    return next(
      new Api500Error(
        'Get Students Error',
        'An error occurred while getting the students.',
      ),
    );
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = {
      _id: new ObjectId(id),
    };
    const students = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('students');
    const result = await students.find(query).toArray();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (error) {
    return next(
      new Api500Error(
        'Get Student Error',
        'An error occurred while getting the student with the given ID.',
      ),
    );
  }
};

const addNewStudent = async (req, res, next) => {
  const studentData = req.body;
  try {
    const students = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('students');
    const result = await students.insertOne(studentData);
    const successMessage = `The student was added to the database under the following id: ${result.insertedId}`;
    return res.status(201).send(successMessage);
  } catch (error) {
    return next(
      new Api500Error(
        'Add Student Error',
        'An error occurred while adding the student.',
      ),
    );
  }
};

const updateStudent = async (req, res, next) => {
  const studentData = req.body;

  try {
    const id = req.params.id;
    const query = {
      _id: new ObjectId(id),
    };
    const students = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('students');
    await students.updateOne(query, { $set: studentData });
  } catch (error) {
    return next(
      new Api500Error(
        'Update Student Error',
        'An error occurred while updating the student.',
      ),
    );
  }

  return res.status(204).send();
};

const deleteStudent = async (req, res, next) => {
  const id = req.params.id;

  try {
    const query = {
      _id: new ObjectId(id),
    };
    const students = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('students');
    const result = await students.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(204).send();
    }
  } catch (error) {
    return next(
      new Api500Error(
        'Delete Student Error',
        'An error occurred while deleting the student.',
      ),
    );
  }

  return res.status(200).send();
};

module.exports = {
  getAllStudents,
  getStudentById,
  addNewStudent,
  updateStudent,
  deleteStudent,
};
