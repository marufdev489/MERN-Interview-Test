const Drawing = require("../models/Drawing");

function drawingController() {
  return {
    // Create a new drawing
    async newDrawing(req, res) {
      try {
        let savedDrawings;

        if (Array.isArray(req.body)) {
          // Handle array of drawings
          savedDrawings = await Drawing.insertMany(req.body);
        } else {
          // Handle a single drawing object
          const newDrawing = new Drawing(req.body);
          savedDrawings = await newDrawing.save();
        }

        return res.status(201).json({
          success: true,
          message: "Drawing(s) created successfully",
          data: savedDrawings,
        });
      } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
    },

    // Get all drawings with pagination
    async getAllDrawings(req, res) {
      try {
        const { page = 1, limit = 10 } = req.query;
        const drawings = await Drawing.find()
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

        const totalDrawings = await Drawing.countDocuments();

        return res.status(200).json({
          success: true,
          message: "Drawings retrieved successfully",
          data: {
            total: totalDrawings,
            page: parseInt(page),
            limit: parseInt(limit),
            drawings,
          },
        });
      } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
    },

    // Get a specific drawing by ID
    async getDrawingById(req, res) {
      try {
        const { id } = req.params;
        const drawing = await Drawing.findById(id);
        if (!drawing) {
          return res.status(404).json({
            success: false,
            message: "Drawing not found",
            data: null,
          });
        }
        return res.status(200).json({
          success: true,
          message: "Drawing retrieved successfully",
          data: drawing,
        });
      } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
    },

    // Update a drawing by ID
    async updateDrawing(req, res) {
      try {
        const { id } = req.params;
        const updatedDrawing = await Drawing.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedDrawing) {
          return res.status(404).json({
            success: false,
            message: "Drawing not found",
            data: null,
          });
        }
        return res.status(200).json({
          success: true,
          message: "Drawing updated successfully",
          data: updatedDrawing,
        });
      } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
    },

    // Delete a drawing by ID
    async deleteDrawing(req, res) {
      try {
        const { id } = req.params;
        const deletedDrawing = await Drawing.findByIdAndDelete(id);
        if (!deletedDrawing) {
          return res.status(404).json({
            success: false,
            message: "Drawing not found",
            data: null,
          });
        }
        return res.status(200).json({
          success: true,
          message: "Drawing deleted successfully",
          data: deletedDrawing,
        });
      } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
    },
  };
}

module.exports = drawingController;
