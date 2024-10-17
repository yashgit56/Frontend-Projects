import { useState } from "react";

function App() {
  const [bgColor, setBgColor] = useState("olive");

  const colors = [
    "Red",
    "Green",
    "Blue",
    "Olive",
    "Gray",
    "Yellow",
    "Pink",
    "Purple",
    "Lavender",
    "White",
    "Black",
  ];

  const getTextColor = (bgColor) => {
    const darkColors = ["Red", "Green", "Blue", "Olive", "Purple", "Black"];
    return darkColors.includes(bgColor) ? "white" : "black";
  };

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: bgColor }}
    >
      <div className="fixed flex flex-wrap justify-center gap-3 shadow-lg bg-white bottom-12 inset-x-2 py-2 rounded-3xl">
        {colors.map((color) => (
          <button
            className="outline-none px-4 py-1 rounded-full shadow-lg"
            style={{ backgroundColor: color, color: getTextColor(color) }}
            onClick={() => setBgColor(color)}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
