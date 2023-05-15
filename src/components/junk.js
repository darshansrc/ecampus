import React, { useState } from "react";
import "./AttendanceDashboard.css";

const AttendanceDashboard = () => {
  const [attendanceData, setAttendanceData] = useState([
    { name: "John", status: "Present" },
    { name: "Jane", status: "Absent" },
    { name: "Bob", status: "Late" },
    { name: "Mary", status: "Present" },
    { name: "Sarah", status: "Present" },
    { name: "Tom", status: "Absent" },
    { name: "Mike", status: "Late" },
    { name: "Jenny", status: "Present" },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[index].status = newStatus;
    setAttendanceData(updatedAttendanceData);
  };

  return (
    <div className="dashboard" style={{paddingTop: '100px'}}>
      <h1>Attendance Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() =>
                    handleStatusChange(index, "Present")
                  }
                >
                  Mark Present
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(index, "Absent")
                  }
                >
                  Mark Absent
                </button>
                <button onClick={() => handleStatusChange(index, "Late")}>
                  Mark Late
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDashboard;
