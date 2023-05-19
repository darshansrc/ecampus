

import { db } from '../Backend/Firebase/firebase';


import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';


const StudentAttendanceTable = ({ sUSN }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    async function fetchAttendanceData() {
      try {
        console.log('Fetching attendance data...');
        const attendanceQuery = query(
          collection(db, 'ISE', 'attendance'),
          where('attendance', 'array-contains', (student) => student.sUSN === sUSN)
        );
        const querySnapshot = await getDocs(attendanceQuery);
        const attendanceData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          attendanceData.push({
            subjectCode: doc.id,
            classesHeld: data.attendance.length,
            classesAttended: data.attendance.filter(
              (student) => student.sUSN === sUSN && student.Present
            ).length,
          });
        });
        setAttendanceData(attendanceData);
        console.log('Attendance data fetched successfully:', attendanceData);
      } catch (error) {
        console.error('Error fetching attendance data', error);
      }
    }

    fetchAttendanceData();
  }, [sUSN]);

  return (
    <table>
      <thead>
        <tr>
          <th>SubjectCode</th>
          <th>Classes Held</th>
          <th>Classes Attended</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((attendance) => (
          <tr key={attendance.subjectCode}>
            <td>{attendance.subjectCode}</td>
            <td>{attendance.classesHeld}</td>
            <td>{attendance.classesAttended}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentAttendanceTable;
