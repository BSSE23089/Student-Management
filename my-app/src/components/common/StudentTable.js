import { Edit2, Trash2 } from "lucide-react";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Course</th>
          <th>Attendance</th>
          <th>Grade</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.course}</td>
            <td>{student.attendance}</td>
            <td>{student.grade}</td>
            <td>
              <span
                className={`status ${student.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {student.status}
              </span>
            </td>
            <td className="actions">
              <Edit2 className="icon edit" onClick={() => onEdit(student)}/>
              <Trash2 className="icon delete" onClick={() => onDelete(student)}/>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
