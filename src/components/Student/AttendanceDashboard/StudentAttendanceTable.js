import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Backend/Firebase/firebase";
import "react-datepicker/dist/react-datepicker.css";
import "./StudentAttendanceTable.css";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import { doc, getDoc } from "firebase/firestore";

import { useRef } from "react";
import DonutChart from "./DonutChart";
import { Chart } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend } from "chart.js/auto";

function StudentAttendanceTable({}) {
  const [attendanceData, setAttendanceData] = useState([]);

  const { user } = useUserAuth();
  const [usn, setUsn] = useState("");

  const getUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUsn(userData.usn);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    getUserData(user.uid);
  }

  useEffect(() => {
    if (user) {
      getUserData(user.uid);
    }
  }, [user]);

  useEffect(() => {
    async function fetchAttendanceData() {
      try {
        const attendanceRefs = [
          "21CS41",
          "21CS42",
          "21CS43",
          "21CS44",
          "21BE45",
        ].map((subject) => collection(db, "ISE", "attendance", subject));
        const attendanceSnapshots = await Promise.all(
          attendanceRefs.map((ref) => getDocs(ref))
        );
        const attendanceDocs = attendanceSnapshots.map((snapshot) =>
          snapshot.docs.map((doc) => doc.data())
        );
        setAttendanceData(attendanceDocs);
      } catch (error) {
        console.error("Error fetching attendance data from Firestore", error);
      }
    }

    fetchAttendanceData();
  }, []);

  const subjectOptions = [
    {
      value: "21CS41",
      label: "Mathematical Foundations for Computing (21CS41)",
    },
    { value: "21CS42", label: "Design and Analysis of Algorithms (21CS42)" },
    { value: "21CS43", label: "Microcontroller and Embedded System (21CS43 )" },
    { value: "21CS44", label: "Operating System (21CS44)" },
    { value: "21BE45", label: "Biology for Engineers (21BE45)" },
  ];

  const getAttendanceCount = (subjectIndex) => {
    return attendanceData[subjectIndex].reduce((total, data) => {
      const student = data.attendance.find((student) => student.sUSN === usn);
      return total + (student && student.Present ? 1 : 0);
    }, 0);
  };

  const getClassCount = (subjectIndex) => {
    return attendanceData[subjectIndex].length;
  };

  const getAttendancePercentage = (subjectIndex) => {
    const attendanceCount = getAttendanceCount(subjectIndex);
    const classCount = getClassCount(subjectIndex);
    return classCount > 0
      ? ((attendanceCount / classCount) * 100).toFixed(2)
      : "N/A";
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const attendancePercentages = attendanceData.map((data, index) =>
        getAttendancePercentage(index)
      );

      const ctx = chartRef.current.getContext("2d");

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy(); // Destroy the previous chart instance
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas

      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: subjectOptions.map((option) => option.value),
          datasets: [
            {
              label: "Attendance Percentage",
              data: attendancePercentages,
              backgroundColor: "rgba(127,106,152,1)",
              borderColor: "rgba(75, 192, 192, 0.1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 10,
              },
            },
          },
        },
      });
    }
  }, [attendanceData, subjectOptions]);

  const totalClassesHeld = attendanceData.reduce(
    (total, data, index) => total + getClassCount(index),
    0
  );

  const totalClassesAttended = attendanceData.reduce(
    (total, data, index) => total + getAttendanceCount(index),
    0
  );

  const totalAttendancePercentage = Math.round(
    (totalClassesAttended / totalClassesHeld) * 100
  );

  return (
    <>
      <div
        className="table-containerr"
        style={{
          marginTop: "60px",
          padding: "15px",
          // maxWidth: "450px",
          marginBottom: "80px",
        }}
      >
        <h4>Attendance Dashboard</h4>
        <DonutChart totalAttendancePercentage={totalAttendancePercentage} />
        <p>
          Lectures: {totalClassesAttended}/{totalClassesHeld}
        </p>
        <table style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th colspan="2">
                <h3>Subject Summary</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((data, index) => (
              <tr key={index}>
                <td>
                  <p class="percentageStyle">
                    {getAttendancePercentage(index)}%
                  </p>
                </td>
                <td>
                  <p className="subjectNames">{subjectOptions[index].label}</p>
                  <div className="lowerInnerTableData">
                    <p className="innerTableData">
                      Absent: {getClassCount(index) - getAttendanceCount(index)}{" "}
                    </p>
                    <div>|</div>
                    <p className="innerTableData">
                      Present: {getAttendanceCount(index)}
                    </p>
                    <div>|</div>
                    <p className="innerTableData">
                      Classes Held: {getClassCount(index)}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <canvas
          ref={chartRef}
          style={{
            margin: "15px",
            //  maxWidth: "450px"
          }}
        ></canvas>
      </div>
    </>
  );
}

export default StudentAttendanceTable;
