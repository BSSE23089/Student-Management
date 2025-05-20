import React, { useState } from "react";
import { saveStudents, loadStudents } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom"; // If you're using React Router
import "../../styles/AddStudent.css";
const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    attendance: "",
    grade: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Optional: remove if not using routing

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, course, attendance, grade } = formData;

    // Basic validation
    if (!name || !course || !attendance || !grade) {
      setError("Please fill all the fields.");
      return;
    }

    const attendanceValue = parseFloat(attendance.replace("%", ""));
    if (
      isNaN(attendanceValue) ||
      attendanceValue < 0 ||
      attendanceValue > 100
    ) {
      setError("Attendance must be a number between 0 and 100%.");
      return;
    }

    // Calculate status
    const normalizedAttendance = attendanceValue;
    const passingGrades = ["A", "A-", "B+", "B", "B-", "C+", "C"];
    let status = "Active";
    if (normalizedAttendance < 75 || !passingGrades.includes(grade.trim())) {
      status = "Warning";
    }
    if (
      normalizedAttendance < 60 ||
      grade.trim() === "D" ||
      grade.trim() === "F"
    ) {
      status = "At Risk";
    }

    const existing = loadStudents();
    const newStudent = {
      id: existing.length > 0 ? existing[existing.length - 1].id + 1 : 1,
      name,
      course,
      attendance: `${normalizedAttendance}%`,
      grade,
      status,
    };

    const updatedList = [...existing, newStudent];
    saveStudents(updatedList);

    setFormData({
      name: "",
      course: "",
      attendance: "",
      grade: "",
    });
    setError("");
    alert("Student added successfully!");
    navigate("/");
  };

  return (
    <div className="add-student-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="add-student-form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
        />
        <input
          type="number"
          name="attendance"
          placeholder="Attendance (%)"
          min="0"
          max="100"
          value={formData.attendance}
          onChange={handleChange}
        />

        <input
          type="text"
          name="grade"
          placeholder="Grade (e.g., A, B+)"
          value={formData.grade}
          onChange={handleChange}
        />

        

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
