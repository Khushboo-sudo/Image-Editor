import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [shape, setShape] = useState(null);
  const [shapeType, setShapeType] = useState('CIRCLE');
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    
    const canvas = new fabric.Canvas(canvasRef.current);
    canvasRef.current = canvas; 

    const handleMouseDown = (event) => {
      switch (shapeType) {
        case 'CIRCLE':
          handleMouseDownCircle(event);
          break;
        case 'RECT':
          handleMouseDownRect(event);
          break;
        case 'ELLIPSE':
          handleMouseDownEllipse(event);
          break;
        case 'TRIANGLE':
          handleMouseDownTriangle(event);
          break;
        case 'LINE':
          handleMouseDownLine(event);
          break;
        case 'TEXT':
          handleMouseDownText(event);
          break;
        case 'POLYGON':
          handleMouseDownPolygon(event);
          break;
        case 'POLYLINE':
          handleMouseDownPolyline(event);
          break;
        default:
          break;
      }
    };

    const handleMouseMove = (event) => {
      switch (shapeType) {
        case 'CIRCLE':
          handleMouseMoveCircle(event);
          break;
        case 'RECT':
          handleMouseMoveRect(event);
          break;
        case 'ELLIPSE':
          handleMouseMoveEllipse(event);
          break;
        case 'TRIANGLE':
          handleMouseMoveTriangle(event);
          break;
        case 'LINE':
          handleMouseMoveLine(event);
          break;
        case 'POLYGON':
          handleMouseMovePolygon(event);
          break;
        case 'POLYLINE':
          handleMouseMovePolyline(event);
          break;
        default:
          break;
      }
    };

    const handleMouseUp = () => {
      switch (shapeType) {
        case 'CIRCLE':
          handleMouseUpCircle();
          break;
        case 'RECT':
          handleMouseUpRect();
          break;
        case 'ELLIPSE':
          handleMouseUpEllipse();
          break;
        case 'TRIANGLE':
          handleMouseUpTriangle();
          break;
        case 'LINE':
          handleMouseUpLine();
          break;
        default:
          break;
      }
    };

    const handleDoubleClick = () => {
      switch (shapeType) {
        case 'POLYGON':
          handleDoubleClickPolygon();
          break;
        case 'POLYLINE':
          handleDoubleClickPolyline();
          break;
        default:
          break;
      }
    };

   
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);
    canvas.on('mouse:dblclick', handleDoubleClick);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
      canvas.off('mouse:dblclick', handleDoubleClick);
    };
  }, [shapeType, isDrawing, shape, originX, originY, startPos, polygonPoints, lines]);

  

  const addPoint = (event) => {
    const pointer = canvasRef.current.getPointer(event.e);
    const newPoint = { x: pointer.x, y: pointer.y };
    setPolygonPoints([...polygonPoints, newPoint]);
    if (polygonPoints.length > 0) {
      const line = new fabric.Line(
        [polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, pointer.x, pointer.y],
        {
          stroke: 'black',
          strokeWidth: 2,
          selectable: false,
          hasControls: false,
        }
      );
      canvasRef.current.add(line);
      setLines([...lines, line]);
    }
  };

  const handleMouseDownPolygon = (event) => {
    addPoint(event);
  };

  const handleMouseMovePolygon = (event) => {
    if (isDrawing && lines.length > 0) {
      const pointer = canvasRef.current.getPointer(event.e);
      lines[lines.length - 1].set({ x2: pointer.x, y2: pointer.y });
      canvasRef.current.renderAll();
    }
  };

  const handleDoubleClickPolygon = () => {
    if (polygonPoints.length > 2) {
      const id = uuidv4();
      const polygon = new fabric.Polygon(polygonPoints, {
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2,
        selectable: true,
        hasControls: true,
        id,
      });
      canvasRef.current.add(polygon);
      setPolygonPoints([]);
      setLines([]);
      setIsDrawing(false);
    }
  };

  
  const handleShapeChange = (event) => {
    setShapeType(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Select Shape: </label>
        <select value={shapeType} onChange={handleShapeChange}>
          <option value="CIRCLE">Circle</option>
          <option value="RECT">Rectangle</option>
          <option value="ELLIPSE">Ellipse</option>
          <option value="TRIANGLE">Triangle</option>
          <option value="LINE">Line</option>
          <option value="TEXT">Text</option>
          <option value="POLYGON">Polygon</option>
          <option value="POLYLINE">Polyline</option>
        </select>
      </div>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default FabricCanvas;
