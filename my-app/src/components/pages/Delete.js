// Delete.js
import React from "react";

const Delete = ({ student, onConfirm, onCancel }) => {
  if (!student) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete <strong>{student.name}</strong>?</p>
        <div className="modal-actions">
          <button onClick={() => onConfirm(student)}>Yes, Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
