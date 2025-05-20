// No change to imports
import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import {
  Search,
  User,
  Book,
  Calendar,
  CheckSquare,
  BarChart2,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import AddStudent from "../pages/AddStudent";
import { loadStudents, saveStudents } from "../../utils/localStorage";
import StatCard from "../common/StatCard";
import StudentTable from "../common/StudentTable";
import Update from "./Update";
import Delete from "./Delete";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleUpdateStudent = (updatedStudent) => {
    const updatedList = students.map((s) =>
      s.id === updatedStudent.id ? updatedStudent : s
    );
    setStudents(updatedList);
    saveStudents(updatedList);
    setShowEditModal(false);
    setEditingStudent(null);
  };

  const confirmDelete = () => {
    const updatedList = students.filter((s) => s.id !== studentToDelete.id);
    setStudents(updatedList);
    saveStudents(updatedList);
    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };

  useEffect(() => {
    const stored = loadStudents();
    if (stored && stored.length > 0) {
      setStudents(stored);
    } else {
      const mockStudents = [
        { id: 1, name: "Alex Johnson", course: "Computer Science", attendance: "95%", grade: "A", status: "Active" },
        { id: 2, name: "Maria Garcia", course: "Data Science", attendance: "88%", grade: "B+", status: "Active" },
        { id: 3, name: "James Wilson", course: "Software Engineering", attendance: "76%", grade: "C", status: "Warning" },
        { id: 4, name: "Sarah Ahmed", course: "Cybersecurity", attendance: "92%", grade: "A-", status: "Active" },
        { id: 5, name: "David Lee", course: "Web Development", attendance: "65%", grade: "D", status: "At Risk" },
      ];
      setStudents(mockStudents);
      saveStudents(mockStudents);
    }
    setLoading(false);
  }, []);

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueCourses = new Set(students.map((s) => s.course)).size;

  const averageAttendance = (() => {
    const valid = students.filter((s) => s.attendance.endsWith("%"));
    if (valid.length === 0) return "0%";
    const total = valid.reduce((sum, s) => sum + parseInt(s.attendance), 0);
    return `${Math.round(total / valid.length)}%`;
  })();

  const passingRate = (() => {
    const passingGrades = ["A", "A-", "B+", "B", "B-", "C+", "C"];
    const passed = students.filter((s) => passingGrades.includes(s.grade));
    return students.length === 0
      ? "0%"
      : `${Math.round((passed.length / students.length) * 100)}%`;
  })();

  const stats = [
    { title: "Total Students", value: students.length.toString(), icon: <User size={20} /> },
    { title: "Courses", value: uniqueCourses.toString(), icon: <Book size={20} /> },
    { title: "Attendance Rate", value: averageAttendance, icon: <Calendar size={20} /> },
    { title: "Passing Rate", value: passingRate, icon: <CheckSquare size={20} /> },
  ];

  return (
    <div className="home-container">
      {showDeleteConfirm && (
        <Delete
          student={studentToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {showEditModal && (
        <Update
          student={editingStudent}
          onUpdate={handleUpdateStudent}
          onClose={() => {
            setShowEditModal(false);
            setEditingStudent(null);
          }}
        />
      )}

      <div className="sidebar">
        <div className="logo">
          <h2>Student Management</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
              <BarChart2 size={18} /><span>Dashboard</span>
            </li>
            <li className={activeTab === "students" ? "active" : ""} onClick={() => setActiveTab("students")}>
              <User size={18} /><span>Add Students</span>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <ul>
            <li><Settings size={18} /><span>Settings</span></li>
            <li><LogOut size={18} /><span>Logout</span></li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="user-actions">
            <div className="notification-bell">
              <Bell size={20} />
              <span className="notification-indicator"></span>
            </div>
            <div className="user-profile">
              <div className="avatar">AD</div>
              <span>Admin</span>
            </div>
          </div>
        </div>

        <div className="page-content">
          {activeTab === "dashboard" && (
            <div className="dashboard">
              <h1>Dashboard</h1>
              <div className="stats-grid">
                {stats.map((stat, i) => (
                  <StatCard key={i} title={stat.title} value={stat.value} icon={stat.icon} />
                ))}
              </div>

              <div className="recent-section">
                <h2>Recent Students</h2>
                {loading ? (
                  <div className="loading-spinner">Loading...</div>
                ) : (
                  <StudentTable
                    students={filteredStudents}
                    onEdit={(student) => {
                      setEditingStudent(student);
                      setShowEditModal(true);
                    }}
                    onDelete={(student) => {
                      setStudentToDelete(student);
                      setShowDeleteConfirm(true);
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <AddStudent students={students} setStudents={setStudents} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
