import React from "react";
import { MdDelete } from "react-icons/md";

function DeleteButton({ action, text }) {
  return (
    <button
      onClick={action}
      className="bg-red-500 px-3 py-1 flex items-center justify-center cursor-pointer rounded hover:bg-red-600 transition duration-300"
    >
      <MdDelete className="hidden sm:flex w-5 h-5 mr-1" />
      {text}
    </button>
  );
}

export default DeleteButton;
