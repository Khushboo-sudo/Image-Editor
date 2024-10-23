import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";
import { useLocation, useNavigate } from "react-router-dom";
import "./CanvasEditor.css";

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location.state?.imageUrl;

  useEffect(() => {
    if (!imageUrl) return;

    const canvas = new fabric.Canvas(canvasRef.current);

    const updateCanvasSize = () => {
      const width = window.innerWidth * 0.5;
      const height = window.innerHeight;
      canvas.setWidth(width);
      canvas.setHeight(height);
    };

    fabric.Image.fromURL(imageUrl, (img) => {
      img.set({
        left: 0,
        top: 0,
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
        selectable: false,
      });

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      canvas.renderAll();
    });

    updateCanvasSize();

    window.addEventListener("resize", () => {
      updateCanvasSize();
      canvas.setBackgroundImage(
        canvas.backgroundImage,
        canvas.renderAll.bind(canvas)
      );
    });

    const addText = () => {
      const text = new fabric.Textbox("Add your Caption", {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 20,
        fill: "black",
        fontWeight: "bold",
      });
      canvas.add(text);
    };

    const addShape = (shape) => {
      let shapeObj;
      switch (shape) {
        case "rectangle":
          shapeObj = new fabric.Rect({ width: 100, height: 100, fill: "blue" });
          break;
        case "circle":
          shapeObj = new fabric.Circle({ radius: 50, fill: "red" });
          break;
        default:
          return;
      }
      canvas.add(shapeObj.set({ left: 50, top: 100 }));
    };

    document.getElementById("addText").addEventListener("click", addText);
    document
      .getElementById("addRectangle")
      .addEventListener("click", () => addShape("rectangle"));
    document
      .getElementById("addCircle")
      .addEventListener("click", () => addShape("circle"));

    document.getElementById("download").addEventListener("click", () => {
      canvas.setBackgroundImage(canvas.backgroundImage, canvas.renderAll.bind(canvas));
      canvas.renderAll();
    
      const dataURL = canvas.toDataURL({
        format: "png",
        multiplier: 2,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "image_with_background.png";
      link.click();
    });

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      canvas.dispose();
    };
  }, [imageUrl]);

  return (
    <div>
     
      <div className="canvas-editor">
        <div className="canvas-container">
          <canvas ref={canvasRef} />
        </div>
        <div className="button-container">
          <button id="addText">Add Text</button>
          <button id="addRectangle">Add Rectangle</button>
          <button id="addCircle">Add Circle</button>
          <button id="download">Download</button>
          <button onClick={() => navigate("/")}>Back to Search</button>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
