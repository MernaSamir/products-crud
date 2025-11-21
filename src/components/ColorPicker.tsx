import React from "react";

export default function ColorPicker({
  colors,
  selectedColors,
  onChange,
}: {
  colors: string[];
  selectedColors: string[];
  onChange: (colors: string[]) => void;
}) {
  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      onChange(selectedColors.filter((c) => c !== color));
    } else {
      onChange([...selectedColors, color]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const isSelected = selectedColors.includes(color);
        return (
          <button
            key={color}
            type="button"
            onClick={() => toggleColor(color)}
            className={`w-8 h-8 rounded cursor-pointer border-2 relative transition ${
              isSelected ? "border-black" : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
          >
            {isSelected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 m-auto w-5 h-5 pointer-events-none"
                stroke={color.toLowerCase() === "#ffffff" ? "black" : "white"}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
