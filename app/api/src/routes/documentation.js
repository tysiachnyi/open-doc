const router = require("express").Router();
const DocumentationSchema = require("../models/Documentation.js");

// CREATE DOCUMENTATION
router.post("/create", async (req, res) => {
  const newDocumentation = new DocumentationSchema(req.body);
  try {
    const savedDocumentation = await newDocumentation.save();
    res.status(200).json(savedDocumentation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE DOCUMENTATION
router.put("/update/:id", async (req, res) => {
  try {
    const documentation = await DocumentationSchema.findById(req.params.id);
    if (documentation.authorId === req.body.authorId) {
      const updatedDocumentation = await DocumentationSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDocumentation);
    } else {
      res.status(401).json("U can update only your project");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET DOCUMENTATION
router.get("/:id", async (req, res) => {
  try {
    const documentation = await DocumentationSchema.findById(req.params.id);
    res.status(200).json(documentation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL PROJECT DOCUMENTATION
router.get("/", async (req, res) => {
  try {
    const documentation = await DocumentationSchema.find({
      projectId: { $eq: req.query.projectId },
    });

    res.status(200).json(documentation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE DOCUMENTATION
router.delete("/delete/:id", async (req, res) => {
  try {
    const documentation = await DocumentationSchema.findById(req.params.id);
    if (documentation.authorId === req.body.authorId) {
      await documentation.delete();
      res.status(200).json("Documentation has been deleted");
    } else {
      res.status(401).json("U can delete only your doc");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
