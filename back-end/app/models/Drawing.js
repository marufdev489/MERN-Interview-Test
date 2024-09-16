const mongoose = require('mongoose');

const drawingDataSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['line', 'circle', 'square', 'text'],
        required: true
    },
    startX: {
        type: Number,
        required: function () {
            return this.type !== 'text'; // startX is required for line, circle, square, not text
        }
    },
    startY: {
        type: Number,
        required: function () {
            return this.type !== 'text'; // startY is required for line, circle, square, not text
        }
    },
    endX: {
        type: Number,
        required: function () {
            return this.type === 'line'; // endX is only required for line
        }
    },
    endY: {
        type: Number,
        required: function () {
            return this.type === 'line'; // endY is only required for line
        }
    },
    radius: {
        type: Number,
        required: function () {
            return this.type === 'circle'; // radius is only required for circle
        }
    },
    size: {
        type: Number,
        required: function () {
            return this.type === 'square'; // size is only required for square
        }
    },
    text: {
        type: String,
        required: function () {
            return this.type === 'text'; // text is only required for text type
        }
    },
    x: {
        type: Number,
        required: function () {
            return this.type === 'text'; // x coordinate is only required for text
        }
    },
    y: {
        type: Number,
        required: function () {
            return this.type === 'text'; // y coordinate is only required for text
        }
    }
}, {
    timestamps: true
});

const Drawing = mongoose.model('Drawing', drawingDataSchema);

module.exports = Drawing;
