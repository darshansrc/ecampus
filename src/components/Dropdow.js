import React, { useState } from "react";
import "./Dropdow.css";

function Dropdow() {
  // Dummy attendance data
  const attendanceData = [
    {
      subject: "Operating System",
      totalClasses: 50,
      attendedClasses: 42,
    },
    {
      subject: "Database Management System",
      totalClasses: 50,
      attendedClasses: 45,
    },
    {
      subject: "Computer Networks",
      totalClasses: 50,
      attendedClasses: 35,
    },
    {
      subject: "Data Structures and Algorithms",
      totalClasses: 50,
      attendedClasses: 48,
    },
  ];

  // State to store the selected subject
  const [selectedSubject, setSelectedSubject] = useState(attendanceData[0]);

  // Function to handle subject selection
  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="App">
      <h1>Attendance Dshboard</h1>
      <div className="dashboard-container">
        <div className="sidebar">
          <h2>Subjects</h2>
          <ul>
            {attendanceData.map((subject) => (
              <li
                key={subject.subject}
                className={
                  subject.subject === selectedSubject.subject
                    ? "selected"
                    : null
                }
                onClick={() => handleSubjectSelection(subject)}
              >
                {subject.subject}
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">
          <h2>{selectedSubject.subject}</h2>
          <div className="attendance-details">
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
                  (selectedSubject.attendedClasses /
                    selectedSubject.totalClasses) *
                  100
                ).toFixed(2)}
                %
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdow;

