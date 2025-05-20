// src/utils/localStorage.js

const STUDENT_KEY = "students";

// Save students to localStorage
export const saveStudents = (students) => {
  localStorage.setItem(STUDENT_KEY, JSON.stringify(students));
};

// Load students from localStorage
export const loadStudents = () => {
  const data = localStorage.getItem(STUDENT_KEY);
  return data ? JSON.parse(data) : [];
};

// Clear students from localStorage (optional helper)
export const clearStudents = () => {
  localStorage.removeItem(STUDENT_KEY);
};
