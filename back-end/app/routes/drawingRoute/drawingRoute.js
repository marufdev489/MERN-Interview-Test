const express = require("express");
const drawingController = require("../../controllers/drawingController");
const router = express.Router();

// GET all drawings with pagination
router.get("/drawings", drawingController().getAllDrawings);

// Add a new drawing
router.post("/drawings", drawingController().newDrawing);

// GET a drawing by ID
router.get("/drawings/:id", drawingController().getDrawingById);

// UPDATE a drawing by ID
router.patch("/drawings/:id", drawingController().updateDrawing);

// DELETE a drawing by ID
router.delete("/drawings/:id", drawingController().deleteDrawing);

module.exports = router;
