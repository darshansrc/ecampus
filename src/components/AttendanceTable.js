import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './AttendanceTable.css'
import 'bootstrap/dist/css/bootstrap.min.css';



export function AttendanceTable() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    async function fetchAttendanceData() {
      try {
        const subjectCode = "21CS41";
        const attendanceRef = collection(db, 'ISE', 'attendance', subjectCode);
        const snapshot = await getDocs(attendanceRef);
        const attendanceDocs = snapshot.docs.map(doc => doc.data());
        setAttendanceData(attendanceDocs);
      } catch (error) {
        console.error('Error fetching attendance data from Firestore', error);
      }
    }

    fetchAttendanceData();
  });

  const getClassCount = () => {
    return attendanceData.length;
  }

  const getAttendanceCount = (sUSN) => {
    return attendanceData.reduce((total, data) => {
      const student = data.attendance.find(student => student.sUSN === sUSN);
      return total + (student && student.Present ? 1 : 0);
    }, 0);
  }

  const getAttendancePercentage = (attendanceCount, classCount) => {
    return classCount > 0 ? ((attendanceCount / classCount) * 100).toFixed(2) : 'N/A';
  }

  return (
    <div className="table-responsive">
    <table style={{padding: '30px'}}>
      <thead>
        <tr>
          <th>USN</th>
          <th>Name</th>
          <th>Classes Held</th>
          <th>Classes Attended</th>
          <th>Attendance Percentage</th>
          {attendanceData.map(data => (
            <th key={data.date.toMillis()}>{data.date.toDate().toLocaleDateString()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {attendanceData[0]?.attendance.map(student => (
          <tr key={student.sUSN}>
            <td>{student.sUSN}</td>
            <td>{student.sName}</td>
            <td>{getClassCount()}</td>
            <td>{getAttendanceCount(student.sUSN)}</td>
            <td>{getAttendancePercentage(getAttendanceCount(student.sUSN), getClassCount())}%</td>
            {attendanceData.map(data => {
              const attendanceRecord = data.attendance.find(record => record.sUSN === student.sUSN);
              return <td key={`${data.date.toMillis()}-${student.sUSN}`} class={attendanceRecord?.Present ? 'attendance-presentt' : 'attendance-absentt'}>{attendanceRecord?.Present ? 'P' : 'A'}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}