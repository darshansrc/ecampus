import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc,collection, setDoc,getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import './Attendance.css'
import Dropdow from "./Dropdow";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDVmNEypBn0_CETRhiJvEKxMZuqvZYvCag",
  authDomain: "rvitme--campus.firebaseapp.com",
  projectId: "rvitme--campus",
  storageBucket: "rvitme--campus.appspot.com",
  messagingSenderId: "500179580181",
  appId: "1:500179580181:web:e774eae4d4ca4b1605251c",
  measurementId: "G-JRHC6LQDVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function Attendance()  {
    const [subjects, setSubjects] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const subjectsData = [];
          const querySnapshot = await getDocs(collection(db, "subjects"));
  
          querySnapshot.forEach((doc) => {
            subjectsData.push({ id: doc.id, ...doc.data() });
          });
  
          setSubjects(subjectsData);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleAttendanceChange = async(subjectId, studentId, date, status) => {
      try {
        const studentRef = doc(
          db,
          "subjects",
          subjectId,
          "students",
          studentId
        );
        const docSnap = await getDoc(studentRef);
  
        if (docSnap.exists()) {
          const attendance = docSnap.data().attendance;
          attendance[date] = status;
  
          await setDoc(studentRef, { attendance }, { merge: true });
          console.log("Attendance updated successfully");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error updating attendance: ", error);
      }
    };

    const [attendanceData, setAttendanceData] = useState([
      { date: '2023-03-28', present: true },
      { date: '2023-03-29', present: true },
      { date: '2023-03-30', present: false },
      { date: '2023-03-31', present: true },
      { date: '2023-04-01', present: true },
      { date: '2023-04-02', present: false },
      { date: '2023-04-03', present: true },
    ]);
  
    const totalClasses = attendanceData.length;
    const presentClasses = attendanceData.filter((data) => data.present).length;
    const absentClasses = attendanceData.filter((data) => !data.present).length;
    const attendancePercentage = (presentClasses / totalClasses) * 100;
  
    return (
      <div style={{paddingTop: '75px'}}>
        <h1>Attendance Tracker</h1>
        
        
        {subjects.map((subject) => (
          <div key={subject.id}>
            <h2>{subject.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>USN</th>
                  <th>Name</th>
                  {Object.keys(subject.dates).map((date) => (
                    <th key={date}>{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(subject.students).map(([studentId, student]) => (
                  <tr key={studentId}>
                    <td>{student.usn}</td>
                    <td>{student.name}</td>
                    {Object.entries(subject.dates).map(([date, dateString]) => (
                      <td key={date}>
                        <select
                          value={student.attendance[date] || ""}
                          onChange={(event) =>
                            handleAttendanceChange(
                              subject.id,
                              studentId,
                              date,
                              event.target.value
                            )
                          }
                        >
                          <option value="">-</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div className="attendance-dashboard">
      <h1>Attendance Dashboard</h1>
      <Dropdow/>
      <div className="attendance-summary">
        <div className="attendance-summary-item">
          <h2>Total Classes:</h2>
          <p>{totalClasses}</p>
        </div>
        <div className="attendance-summary-item">
          <h2>Present:</h2>
          <p>{presentClasses}</p>
        </div>
        <div className="attendance-summary-item">
          <h2>Absent:</h2>
          <p>{absentClasses}</p>
        </div>
        <div className="attendance-summary-item">
          <h2>Attendance Percentage:</h2>
          <p>{attendancePercentage}%</p>
        </div>
      </div>
      <div className="attendance-data">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.present ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      </div>
      
    );
  }
  
  export default Attendance;
  
