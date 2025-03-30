import React from "react";

const FormButton = ({ buttonName }) => {
  return (
    <button
      type="submit"
      className="border-2 border-primary bg-primary rounded-xl py-2 mt-5 cursor-pointer font-medium
          hover:border-secondary hover:bg-secondary hover:scale-102 transition duration-300"
    >
      {buttonName}
    </button>
  );
};

export default FormButton;
