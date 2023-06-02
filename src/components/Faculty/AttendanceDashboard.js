import React, { useState } from "react";
import Sidebar from "../Student/DesktopNav/Sidebar";



function AttendanceDashboard() {
  const [attendanceData, setAttendanceData] = useState([
    { subject: "Operating System", totalClasses: 50, attendedClasses: 42 },
    { subject: "Database Management System", totalClasses: 50, attendedClasses: 45 },
    { subject: "Computer Networks", totalClasses: 50, attendedClasses: 35 },
    { subject: "Data Structures and Algorithms", totalClasses: 50, attendedClasses: 48 },
  ]);
  const [selectedSubject, setSelectedSubject] = useState(attendanceData[0]);

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div style={{position: 'fixed'}}>
    <Sidebar/>
      <h1 style={{marginTop: '100px',marginLeft: '440px',textAlign: 'center'}}>Attendance Dashboard</h1>
      <table style={{margin: '100px',marginLeft: '280px',alignItems: 'center'}}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Classes</th>
            <th>Attended Classes</th>
            <th>Attendance Percentage</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((subject) => (
            <tr
              key={subject.subject}
              className={subject === selectedSubject ? "selected" : null}
              onClick={() => handleSubjectSelection(subject)}
            >
              <td>{subject.subject}</td>
              <td>{subject.totalClasses}</td>
              <td>{subject.attendedClasses}</td>
              <td>{((subject.attendedClasses / subject.totalClasses) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{margin: '100px',marginLeft: '280px'}}>
        <h2>{selectedSubject.subject}</h2>
        <p>
          Total Classes: <strong>{selectedSubject.totalClasses}</strong>
        </p>
        <p>
          Attended Classes:{" "}
          <strong>{selectedSubject.attendedClasses}</strong>
        </p>
        <p>
          Attendance Percentage:{" "}
          <strong>
            {(
              (selectedSubject.attendedClasses / selectedSubject.totalClasses) *
              100
            ).toFixed(2)}
            %
          </strong>
        </p>
      </div>
    </div>
  );
}

export default AttendanceDashboard;
