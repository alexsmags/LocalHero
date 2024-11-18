'use client';
import React from "react";
import { Card } from "@nextui-org/react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Card
      className="error-message-card mt-4"
      style={{
        backgroundColor: "#fdecea",
        padding: "1rem",
        borderRadius: "0.5rem",
        border: "1px solid #f5c6cb",
      }}
    >
      <p style={{ color: "#c0392b", fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>
        {message}
      </p>
    </Card>
  );
};

export default ErrorMessage;
