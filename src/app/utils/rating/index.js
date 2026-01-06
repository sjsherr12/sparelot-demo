import React from "react";

const Rating = ({ value = 0, max = 5, precision=1, size=16, readOnly = false, onChange }) => {
  // Calculate how many stars should be displayed based on max and precision
  const numberOfStars = Math.ceil(max / precision);

  const handleClick = (index) => {
    if (!readOnly && onChange) {
      const newValue = (index + 1) * precision; // Calculate the precise rating
      onChange(newValue);
    }
  };

  // Render each individual star with precision
  const renderStar = (index) => {
    const fullValue = (index + 1) * precision;
    let fillPercentage = 0;

    // Calculate the fill percentage of each star
    if (value >= fullValue) {
      fillPercentage = 100; // Fully filled
    } else if (value > fullValue - precision) {
      fillPercentage = ((value - (index * precision)) / precision) * 100; // Partially filled
    }

    return (
      <svg
        key={index}
        onClick={() => handleClick(index)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          width: size,
          height: size,
          cursor: readOnly ? "default" : "pointer",
          display: "inline-block",
          position: "relative",
        }}
      >
        {/* Star outline */}
        <path
          d="M12 .587l3.668 7.431 8.214 1.195-5.941 5.788 1.402 8.178-7.343-3.861-7.343 3.861 1.402-8.178-5.941-5.788 8.214-1.195z"
          fill="#E0E0E0"
        />
        {/* Filled part */}
        <path
          d="M12 .587l3.668 7.431 8.214 1.195-5.941 5.788 1.402 8.178-7.343-3.861-7.343 3.861 1.402-8.178-5.941-5.788 8.214-1.195z"
          fill="#FFD700"
          style={{
            clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
          }}
        />
      </svg>
    );
  };

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {/* Create the correct number of stars based on precision */}
      {[...Array(numberOfStars)].map((_, index) => renderStar(index))}
    </div>
  );
};

export default Rating;
