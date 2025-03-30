import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
