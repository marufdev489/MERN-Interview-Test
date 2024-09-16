import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./canvas.css";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";
import useDelete from "../../hooks/useDelete";

export const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState("line"); // line, circle, square, text
  const [context, setContext] = useState(null);
  const [shapes, setShapes] = useState([]); // Store all shapes
  const [inputText, setInputText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [inputPos, setInputPos] = useState({ x: 0, y: 0 });

  const { id } = useParams();

  //data fetching

  const urlWithId = `http://localhost:4000/api/drawing/drawings/${id}`;

  const {
    data: postData,
    loading: postLoading,
    error: postError,
    postData: postAction,
  } = usePost(urlWithId);
  const {
    data: putData,
    loading: putLoading,
    error: putError,
    putData: putAction,
  } = usePut(urlWithId);
  const {
    data: deletedData,
    loading: deletedDataLoading,
    error: deletedDataError,
    deleteData,
  } = useDelete(urlWithId);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
  }, []);

  // Function to redraw all shapes on the canvas
  const redrawCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    shapes.forEach((shape) => {
      context.beginPath();
      if (shape.type === "line") {
        context.moveTo(shape.startX, shape.startY);
        context.lineTo(shape.endX, shape.endY);
        context.stroke();
      } else if (shape.type === "circle") {
        context.arc(shape.startX, shape.startY, shape.radius, 0, Math.PI * 2);
        context.stroke();
      } else if (shape.type === "square") {
        context.rect(shape.startX, shape.startY, shape.size, shape.size);
        context.stroke();
      } else if (shape.type === "text") {
        context.font = "16px Arial";
        context.fillText(shape.text, shape.x, shape.y);
      }
      context.closePath();
    });
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;

    // Store starting coordinates for drawing shapes
    context.startX = offsetX;
    context.startY = offsetY;

    if (currentShape !== "text") {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
  };

  const draw = (e) => {
    if (!isDrawing || currentShape === "text") return;

    const { offsetX, offsetY } = e.nativeEvent;

    // Redraw all previously stored shapes
    redrawCanvas();

    // Draw the current shape being drawn
    context.beginPath();
    if (currentShape === "line") {
      context.moveTo(context.startX, context.startY);
      context.lineTo(offsetX, offsetY);
      context.stroke();
    } else if (currentShape === "circle") {
      const radius = Math.sqrt(
        Math.pow(offsetX - context.startX, 2) +
          Math.pow(offsetY - context.startY, 2)
      );
      context.arc(context.startX, context.startY, radius, 0, Math.PI * 2);
      context.stroke();
    } else if (currentShape === "square") {
      const size = Math.max(
        Math.abs(offsetX - context.startX),
        Math.abs(offsetY - context.startY)
      );
      context.rect(context.startX, context.startY, size, size);
      context.stroke();
    }
    context.closePath();
  };

  const endDrawing = (e) => {
    setIsDrawing(false);

    const { offsetX, offsetY } = e.nativeEvent;

    // Add the newly drawn shape to the shapes array in state
    let newShape;
    if (currentShape === "line") {
      newShape = {
        type: "line",
        startX: context.startX,
        startY: context.startY,
        endX: offsetX,
        endY: offsetY,
      };
    } else if (currentShape === "circle") {
      const radius = Math.sqrt(
        Math.pow(offsetX - context.startX, 2) +
          Math.pow(offsetY - context.startY, 2)
      );
      newShape = {
        type: "circle",
        startX: context.startX,
        startY: context.startY,
        radius,
      };
    } else if (currentShape === "square") {
      const size = Math.max(
        Math.abs(offsetX - context.startX),
        Math.abs(offsetY - context.startY)
      );
      newShape = {
        type: "square",
        startX: context.startX,
        startY: context.startY,
        size,
      };
    } else if (currentShape === "text") {
      setInputPos({ x: offsetX, y: offsetY });
      setShowInput(true);
      return;
    }

    setShapes([...shapes, newShape]);
  };

  const handleShapeChange = (shape) => {
    setCurrentShape(shape);
  };

  const handleErase = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setShapes([]);
  };

  const handleUndo = () => {
    if (shapes.length > 0) {
      setShapes(shapes.slice(0, -1)); // Remove the last shape
      redrawCanvas();
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();

    context.font = "16px Arial";
    context.fillText(inputText, inputPos.x, inputPos.y);

    const newText = {
      type: "text",
      text: inputText,
      x: inputPos.x,
      y: inputPos.y,
    };

    setShapes([...shapes, newText]);
    setShowInput(false);
    setInputText("");
  };

  const handleSubmit = () => {
    console.log("ok");
  };

  return (
    <div className="content-wrapper">
      <div className="button-container">
        <button onClick={() => handleShapeChange("line")}>Line</button>
        <button onClick={() => handleShapeChange("circle")}>Circle</button>
        <button onClick={() => handleShapeChange("square")}>Square</button>
        <button onClick={() => handleShapeChange("text")}>Text</button>
        <button onClick={handleErase}>Erase</button>
        <button onClick={handleUndo} disabled={shapes.length === 0}>
          Undo
        </button>
      </div>

      {showInput && (
        <form
          onSubmit={handleTextSubmit}
          style={{ position: "absolute", left: inputPos.x, top: inputPos.y }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onBlur={handleTextSubmit}
            autoFocus
          />
        </form>
      )}

      <canvas
        className="canvas-container"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        width={1000}
        height={600}
      />
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
