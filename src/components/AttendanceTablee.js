import { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

function AttendanceTablee() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    async function fetchAttendanceData() {
      try {
        const subjectCode =  "21CS41";
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

  const handleAttendanceChange = (date, sUSN, newAttendanceValue) => {
    const newAttendanceData = attendanceData.map(data => {
      if (data.date.toMillis() === date.getTime()) {
        const newAttendance = data.attendance.map(student => {
          if (student.sUSN === sUSN) {
            return {
              ...student,
              Present: newAttendanceValue === 'P',
            }
          } else {
            return student;
          }
        });
        return {
          ...data,
          attendance: newAttendance,
        };
      } else {
        return data;
      }
    });
    setAttendanceData(newAttendanceData);
  }

  const handleSubmit = async (date, sUSN, newAttendanceValue) => {
    const subjectCode = '21CS41';
    const attendanceRef = collection(db, 'ISE', 'attendance', subjectCode);
    const attendanceDoc = attendanceRef.doc(date.toISOString());
    const data = attendanceData.find(data => data.date.toMillis() === date.getTime());
    const newAttendance = data.attendance.map(student => {
      if (student.sUSN === sUSN) {
        return {
          ...student,
          Present: newAttendanceValue === 'P',
        }
      } else {
        return student;
      }
    });
    const newAttendanceDoc = {
      date: data.date,
      attendance: newAttendance,
      presentCount: newAttendance.reduce((count, student) => count + (student.Present ? 1 : 0), 0),
      absentCount: newAttendance.reduce((count, student) => count + (student.Present ? 0 : 1), 0),
     
    };
    try {
      await setDoc(attendanceDoc, newAttendanceDoc);
      alert('Attendance updated successfully!');
    } catch (error) {
      console.error('Error writing to Firestore', error);
      alert('Failed to update attendance. Please try again.');
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>USN</th>
          <th>Name</th>
          <th>Classes Held</th>
          <th>Classes Attended</th>
          <th>Attendance Percentage</th>
          {attendanceData.map(data => (
            <th key={data.date.toMillis()}>{new Date(data.date.toMillis()).toLocaleDateString()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.sUSN}>
            <td>{student.sUSN}</td>
            <td>{student.sName}</td>
            <td>{getClassCount()}</td>
            <td>{getAttendanceCount(student.sUSN)}</td>
            <td>{getAttendancePercentage(getAttendanceCount(student.sUSN), getClassCount())}%</td>
            {attendanceData.map(data => {
              const attendance = data.attendance.find(attendance => attendance.sUSN === student.sUSN);
              return (
                <td key={`${data.date.toMillis()}-${attendance.sUSN}`}>
                  <AttendanceCell
                    date={new Date(data.date.toMillis())}
                    sUSN={attendance.sUSN}
                    attendance={attendance.Present ? 'P' : 'A'}
                    onAttendanceChange={handleAttendanceChange}
                    onSubmit={handleSubmit}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default AttendanceTablee;