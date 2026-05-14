import React from "react";

const Card = ({ className, ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className || ""}`}
      {...props}
    />
  );
};

const CardContent = ({ className, ...props }) => {
  return <div className={`p-4 ${className || ""}`} {...props} />;
};

export { Card, CardContent };