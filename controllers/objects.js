const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect');
const { checkEmptyFields } = require('../utils/dataTools');

const getAllObjects = async (req, res) => {
  try {
    const Objects = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('objects');
    const result = await Objects.find().toArray();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while getting the objects.',
      error: error.message,
    });
  }
};

const getObjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = {
      _id: new ObjectId(id),
    };
    const Objects = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('objects');
    const result = await Objects.find(query).toArray();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while getting the objects.',
      error: error.message,
    });
  }
};

const addNewObject = async (req, res) => {
  const objectData = req.body;
  const requiredFields = [
    'name',
    'description',
    'location_found',
    'found_by',
    'date_found',
  ];

  try {
    checkEmptyFields(objectData, requiredFields);
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred while adding the object.',
      error: error.message,
    });
  }

  try {
    const objects = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('objects');
    const result = await objects.insertOne(objectData);
    const successMessage = `The object was added to the database under the following id: ${result.insertedId}`;
    return res.status(201).send(successMessage);
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while adding the object.',
      error: error.message,
    });
  }
};

module.exports = {
  getAllObjects,
  getObjectById,
  addNewObject,
};
