import React from "react";
import { Link } from "react-router";
import { IoMdAddCircle } from "react-icons/io";

function AddButton({ link, text }) {
  return (
    <Link
      to={link}
      className="bg-primary hover:bg-secondary text-nowrap flex items-center justify-center text-center px-1 sm:px-2 md:px-3 py-3 cursor-pointer rounded transition duration-300"
    >
      <IoMdAddCircle className="hidden sm:flex w-5 h-5 mr-1" />
      {text}
    </Link>
  );
}

export default AddButton;
