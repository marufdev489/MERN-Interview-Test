import React from "react";
import { useNavigate } from "react-router-dom";
import "./all-canvas.css";
import useGet from "../../hooks/useGet";

// Sample array of canvases with dynamic IDs
const canvases = [
  { id: 1, title: "Canvas 1" },
  { id: 2, title: "Canvas 2" },
  { id: 3, title: "Canvas 3" },
  { id: 4, title: "Canvas 4" },
  { id: 5, title: "Canvas 5" },
];

export const AllCanvas = () => {
  const url = "http://localhost:4000/api/drawing/drawings";
  const { data, loading, error, refetch } = useGet(url);
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add-canvas");
  };

  // Handle click for individual canvas, navigate with its ID
  const handleClick = (id) => {
    navigate(`/canvas/${id}`);
  };

  return (
    <>
      <div className="header-text">
        <h1>ALL Canvas</h1>
      </div>
      <div className="button-wrapper">
        <button className="add-canvas-btn" onClick={handleAddClick}>
          Add Canvas
        </button>
      </div>
      <div className="card-wrapper">
        {canvases.map((canvas) => (
          <div
            key={canvas.id}
            className="card-container"
            onClick={() => handleClick(canvas.id)}
          >
            <img
              src={"/whiteboard.jpg"}
              alt={canvas.title}
              className="card-image"
            />
            <div className="card-title">{canvas.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};
