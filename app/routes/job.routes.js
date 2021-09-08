module.exports = app => {
    const jobs = require("../controllers/job.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Job
    router.post("/", jobs.create);
  
    // Retrieve all Jobs
    router.get("/", jobs.findAll);
  
    // Retrieve a single Job with id
    router.get("/:id", jobs.findOne);
  
    // Delete a Job with id
    router.delete("/:id", jobs.delete);
  
    // Create a new Job
    router.delete("/", jobs.deleteAll);
  
    app.use('/api/jobs', router);
};