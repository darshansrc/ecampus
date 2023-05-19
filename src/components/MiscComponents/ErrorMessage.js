import { useState, useEffect } from "react";
import { auth } from "../Backend/Firebase/firebase";
import "./ErrorMessage.css";

export function ErrorMessage({ message }) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (message) {
      setShowError(true);

      const timeout = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className={`error-message ${showError ? "show" : ""}`}>
      <p>{message}</p>
    </div>
  );
}
