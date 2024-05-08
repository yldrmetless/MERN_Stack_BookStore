import React from "react";

const Spinner = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="animate-ping w-16 h-16 rounded-full bg-sky-500"></div>
    </div>
  );
};

export default Spinner;
