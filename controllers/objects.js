const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect');
const Api500Error = require('../error_handling/api500Error');

const getAllObjects = async (req, res, next) => {
  try {
    const objects = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('objects');
    const result = await objects.find().toArray();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (error) {
    return next(
      new Api500Error(
        'Get Objects Error',
        'An error occurred while getting the objects.',
      ),
    );
  }
};

const getObjectById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = {
      _id: new ObjectId(id),
    };
    const objects = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('objects');
    const result = await objects.find(query).toArray();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (error) {
    return next(
      new Api500Error(
        'Get Object Error',
        'An error occurred while getting the object with the given ID.',
      ),
    );
  }
};

const addNewObject = async (req, res, next) => {
  const objectData = req.body;
  try {
    const objects = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('objects');
    const result = await objects.insertOne(objectData);
    const successMessage = `The object was added to the database under the following id: ${result.insertedId}`;
    return res.status(201).send(successMessage);
  } catch (error) {
    return next(
      new Api500Error(
        'Add Object Error',
        'An error occurred while adding the object.',
      ),
    );
  }
};

const updateObject = async (req, res, next) => {
  const objectData = req.body;

  try {
    const id = req.params.id;
    const query = {
      _id: new ObjectId(id),
    };
    const objects = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('objects');
    await objects.updateOne(query, { $set: objectData });
  } catch (error) {
    return next(
      new Api500Error(
        'Update Object Error',
        'An error occurred while updating the object.',
      ),
    );
  }

  return res.status(204).send();
};

const deleteObject = async (req, res, next) => {
  const id = req.params.id;

  try {
    const query = {
      _id: new ObjectId(id),
    };
    const objects = await mongodb
      .getDb()
      .db('per_proj_db')
      .collection('objects');
    const result = await objects.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(204).send();
    }
  } catch (error) {
    return next(
      new Api500Error(
        'Delete Object Error',
        'An error occurred while deleting the object.',
      ),
    );
  }

  return res.status(200).send();
};

module.exports = {
  getAllObjects,
  getObjectById,
  addNewObject,
  updateObject,
  deleteObject,
};
