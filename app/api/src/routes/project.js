const router = require("express").Router();
const ProjectSchema = require("../models/Project");

// CREATE PROJECT
router.post("/create", async (req, res) => {
  const newProject = new ProjectSchema(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PROJECT
router.put("/update/:id", async (req, res) => {
  try {
    const project = await ProjectSchema.findById(req.params.id);
    if (project.authorId === req.body.authorId) {
      const updatedProject = await ProjectSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProject);
    } else {
      res.status(401).json("U can update only your project");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET PROJECT
router.get("/:id", async (req, res) => {
  try {
    const project = await ProjectSchema.findById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL PROJECT
router.get("/", async (req, res) => {
  let projects;
  try {
    if (req.query.authorId) {
      console.log(req.query.authorId);
      projects = await ProjectSchema.find({
        authorId: { $eq: req.query.authorId },
      });
    } else {
      projects = await ProjectSchema.find();
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE PROJECT
router.delete("/delete/:id", async (req, res) => {
  try {
    const project = await ProjectSchema.findById(req.params.id);
    if (project.authorId === req.body.authorId) {
      await project.delete();
      res.status(200).json("Project has been deleted");
    } else {
      res.status(401).json("U can delete only your project");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
