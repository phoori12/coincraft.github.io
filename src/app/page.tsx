"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [coinShape, setCoinShape] = useState<"circle"| "square">("circle");
  const [circleColorIndex, setCircleColorIndex] = useState(0);
  const [borderColorIndex, setBorderColorIndex] = useState(1);
  const [letterIndex, setLetterIndex] = useState(0); 
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const colors = [
    { name: "Green", hex: "#008000" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Red", hex: "#FF0000" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Purple", hex: "#800080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Black", hex: "#000000" },
    { name: "Gray", hex: "#808080" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Teal", hex: "#008080" },
    { name: "Brown", hex: "#8B4513" }
  ];

  const handleExport = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContainer = canvas.parentElement;
    if (!canvasContainer) return;
    const canvasImage = await html2canvas(canvasContainer);
    const link = document.createElement("a");
    link.download = "coin-logo.png";
    link.href = canvasImage.toDataURL("image/png");
    link.click();
  };

  const renderCoinShape = () => {
    const circleColor = colors[circleColorIndex].hex;
    const borderColor = colors[borderColorIndex].hex;
    const letter = letters[letterIndex]

    switch (coinShape) {
      case "square":
        return (
          <div
            ref={canvasRef}
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: circleColor,
              border: `10px solid ${borderColor}`,
              position: "relative",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "100px",
                fontWeight: "bold",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {letter}
            </span>
          </div>
        );
      case "circle":
      default:
        return (
          <div
            ref={canvasRef}
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: circleColor,
              border: `10px solid ${borderColor}`,
              borderRadius: "50%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "100px",
                fontWeight: "bold",
              }}
            >
              {letter}
            </span>
          </div>
        );
    }
  };

  const changeShape = (direction: 'left' | 'right') => {
    const shapes: ("circle" | "square")[] = ["circle", "square"];
    let currentIndex = shapes.indexOf(coinShape);
    if (direction === "left") {
      currentIndex = currentIndex === 0 ? shapes.length - 1 : currentIndex - 1;
    } else {
      currentIndex = currentIndex === shapes.length - 1 ? 0 : currentIndex + 1;
    }
    setCoinShape(shapes[currentIndex]);
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 m-auto gap-8 bg-colors-whitesmoke rounded-2xl">
      <h1 className="text-3xl font-bold text-black">Craft Your Own Crypto Coin</h1>
      <div>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Canvas Section */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {renderCoinShape()}
        </div>

        {/* Customization Options */}
        <div className="grid justify-items-center text-black">
          {/* Coin Shape Arrow Selector */}
          <div>
          {/* <p>Coin Shape:</p> */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button
              onClick={() => changeShape("left")}
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ◀
            </button>
            
            {/* Shape Preview */}
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "grey",
                borderRadius: coinShape === "circle" ? "50%" : "0%", // Circle for 'circle', square for 'square'
                margin: "0 10px",
              }}
            ></div>
            
            <button
              onClick={() => changeShape("right")}
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </div>
        </div>
        
        {/* Letter Selector */}
        <div>
        {/* <p>Letter:</p> */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() =>
                setLetterIndex((prev) => (prev - 1 + letters.length) % letters.length)
              }
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ◀
            </button>
            <div className="w-12 h-12 text-4xl font-bold text-center inline-flex items-center justify-center">
              {letters[letterIndex]}
            </div>
            <button
              onClick={() =>
                setLetterIndex((prev) => (prev + 1) % letters.length)
              }
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </div>
        </div>

        {/* Background Color Selector */}
        <div>
          {/* <p>Background Color:</p> */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() =>
                setCircleColorIndex((prev) => (prev - 1 + colors.length) % colors.length)
              }
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ◀
            </button>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: colors[circleColorIndex].hex,
                borderRadius: "50%",
                border: "1px solid gray",
              }}
            ></div>
            <button
              onClick={() =>
                setCircleColorIndex((prev) => (prev + 1) % colors.length)
              }
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </div>
        </div>

        {/* Border Color Selector */}
        <div>
          {/* <p>Border Color:</p> */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() =>
                setBorderColorIndex((prev) => (prev - 1 + colors.length) % colors.length)
              }
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ◀
            </button>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: colors[borderColorIndex].hex,
                borderRadius: "50%",
                border: "1px solid gray",
              }}
            ></div>
            <button
              onClick={() =>
                setBorderColorIndex((prev) => (prev + 1) % colors.length)
              }
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </div>
        </div>

        
    </div>
  </div>

      
      
    </div>
    {/* Export Button */}
    <button
      onClick={handleExport}
      className="px-5 py-2.5 text-xl bg-green-500 text-white border-none rounded-lg cursor-pointer"
    >
      Export Logo
    </button>
  </div>
  );
}
