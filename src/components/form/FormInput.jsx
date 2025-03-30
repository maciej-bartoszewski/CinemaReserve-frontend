import React from "react";

const FormInput = ({
  inputValue,
  setInputValue,
  inputName,
  icon,
  placeholder,
  type,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={inputValue} className="flex gap-1 items-center">
        {icon}
        {inputName}
      </label>
      {type === "textarea" ? (
        <textarea
          name={inputValue}
          id={inputValue}
          placeholder={placeholder}
          className={`min-h-60 border-3 p-2 border-bg1 bg-bg1 outline-0 rounded-xl mb-2 transition duration-300 placeholder-gray-400 resize-none
            ${error ? "border-red-500 focus:border-red-500 hover:border-red-500" : "focus:border-primary hover:border-primary"}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <input
          type={type}
          name={inputValue}
          id={inputValue}
          placeholder={placeholder}
          className={`border-3 p-2 border-bg1 bg-bg1 outline-0 rounded-xl mb-2 transition duration-300 placeholder-gray-400
            ${error ? "border-red-500 focus:border-red-500 hover:border-red-500" : "focus:border-primary hover:border-primary"}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
      {error && (
        <p className="text-red-500 text-xxs md:text-sm text-center">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
