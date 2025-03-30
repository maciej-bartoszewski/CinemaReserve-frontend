import React from "react";
import { Link } from "react-router";
import { MdModeEdit } from "react-icons/md";

function EditButton({ link, text }) {
  return (
    <Link
      to={link}
      className="bg-primary px-3 py-1 flex items-center justify-center cursor-pointer rounded hover:bg-secondary transition duration-300"
    >
      <MdModeEdit className="hidden sm:flex w-5 h-5 mr-1" />
      {text}
    </Link>
  );
}

export default EditButton;
