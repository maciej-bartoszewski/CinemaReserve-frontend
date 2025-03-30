import React from "react";
import { PiSmileySadLight } from "react-icons/pi";

function NotFoundComponent({ text }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <PiSmileySadLight className="w-24 h-24 md:w-32 md:h-32 xl:w-48 xl:h-48" />
      <h2 className="text-2xl text-gray-300">{text}</h2>
    </div>
  );
}

export default NotFoundComponent;
