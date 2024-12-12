import React from "react";
import "./LibraryActions.css";

const LibraryActions = ({ handleDownload }) => {
  return (
    <div className="library-actions">
      <p className="library-actions owned">
        Книга вже є у вашій бібліотеці
      </p>
      <button className="library-actions read" onClick={handleDownload}>
        Читати
      </button>
    </div>
  );
};

export default LibraryActions;
