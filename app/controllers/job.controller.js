const db = require("../models");
const Job = db.jobs;

// Create and Save a new Job
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Job
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    salary: req.body.salary
  });

  // Save Job in the database
  job
    .save(job)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job."
      });
    });
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Job.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Jobs."
        });
      });
};

// Find a single Job with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Job.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Job with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Job with id=" + id });
    });
};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Job.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
          });
        } else {
          res.send({
            message: "Job was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Job with id=" + id
        });
    });
};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
    Job.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Jobs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Jobs."
      });
    });
};