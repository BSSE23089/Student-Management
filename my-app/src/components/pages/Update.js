import React from "react";

const Update = ({ student, onClose, onUpdate }) => {
  if (!student) {
    return null;
  }
   
   
  const computeStatus = (attendance, grade) => {
    const att = parseInt(attendance);
    const activeGrades = ["A", "A-", "B+", "B", "B-", "C+", "C"];

    if (att < 70 || !activeGrades.includes(grade)) {
      return "At Risk";
    }
    if ((att >= 70 && att < 80) || grade === "C" || grade === "C+") {
      return "Warning";
    }
    return "Active";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAttendance = parseInt(e.target.attendance.value);
    const updatedGrade = e.target.grade.value;

    // Validate attendance range
    if (isNaN(updatedAttendance) || updatedAttendance < 0 || updatedAttendance > 100) {
      alert("Attendance must be between 0 and 100.");
      return;
    }

    const updated = {
      ...student,
      name: e.target.name.value,
      course: e.target.course.value,
      attendance: `${updatedAttendance}%`,
      grade: updatedGrade,
      status: computeStatus(updatedAttendance, updatedGrade),
    };

    onUpdate(updated);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input name="name" defaultValue={student.name} required />
          </label>
          <label>
            Course:
            <input name="course" defaultValue={student.course} required />
          </label>
          <label>
            Attendance (%):
            <input
              name="attendance"
              type="number"
              min="0"
              max="100"
              defaultValue={parseInt(student.attendance)}
              required
            />
          </label>
          <label>
            Grade:
            <input name="grade" defaultValue={student.grade} required />
          </label>
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
