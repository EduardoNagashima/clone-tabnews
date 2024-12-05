import React from "react";

export default function Button({ className = "", children, ...props }) {
  return (
    <div className={`${className} cursor-pointer`}>
      <button {...props}>{children}</button>
    </div>
  );
}
