import React from "react";

function PageButton({ action, text, disabled }) {
  return (
    <button
      className={`bg-primary px-3 py-1 mx-1 rounded disabled:opacity-50 transition duration-300 
        ${!disabled ? "hover:bg-secondary cursor-pointer" : ""}`}
      onClick={action}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default PageButton;
