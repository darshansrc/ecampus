

import { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import data from './data';
import { collection, addDoc,setDoc,doc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import "./App.css"
import Select from 'react-select'
import "./style.css"
import success from "../Images/success.png";
import FacultySidebar from './FacultySidebar';
import { useUserAuth } from "./context/UserAuthContext";
import { AttendanceTable } from './AttendanceTable';


export default function AttendanceSession() {
  const [attendance, setAttendance] = useState(data);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalSteps, setTotalSteps] = useState(3);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  

  const [currentStep, setCurrentStep] = useState(1);

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const { user } = useUserAuth();

  useEffect(() => {
    async function updateFirestore() {
      try {
        const subjectCode = selectedSubject.value;
        const Time = new Date().toISOString();
        

        const subjectRef = collection(db,  'attendance', subjectCode, Time );
        const newAttendanceDoc = {
          date: Timestamp.now(),
          attendance: attendance.map(student => ({
            sName: student.sName,
            sUSN: student.sUSN,
            Present: student.Present,
            
          })),
          presentCount: presentCount,
          absentCount: absentCount,
          updatedBy: user.displayName,
        };
        await setDoc(doc(db, 'ISE', 'attendance', subjectCode, Time ), newAttendanceDoc);
      } catch (error) {
        console.error('Error writing to Firestore', error);
      }
    }
  
    if (attendance.length > 0 && presentCount > 0) {
      updateFirestore();
    }
  }, [attendance, presentCount, absentCount, selectedSubject]);

  function toggleAttendance(usn) {
    setAttendance(prevAttendance => {
      return prevAttendance.map(student => {
        if (student.sUSN === usn) {
          return { ...student, Present: !student.Present };
        } else {
          return student;
        }
      });
    });
  }

  function submitAttendance() {
    let presentCount = 0;
    let absentCount = 0;

    attendance.forEach(student => {
      if (student.Present) {
        presentCount++;
      } else {
        absentCount++;
      }
    });

    setPresentCount(presentCount);
    setAbsentCount(absentCount);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  }

  const studentCards = attendance.map(student => (
    <StudentCard
      key={student.sUSN}
      img={student.Image}
      USN={student.sUSN}
      Name={student.sName}
      last5att={student.last5att}
      total={student.totalAt}
      Present={student.Present}
      toggle={() => toggleAttendance(student.sUSN)}
    />
  ));

  const subjectOptions = [
    { value: '21CS41', label: '21CS41 (Mathematical Foundations for Computing)' },
    { value: '21CS42', label: '21CS42 (Design and Analysis of Algorithms)' },
    { value: '21CS43', label: '21CS43 (Microcontroller and Embedded System)' },
    { value: '21CS44', label: '21CS44 (Operating System)' },
    { value: '21BE45', label: '21BE45 (Biology for Engineers)' },
  ];
  
  const sessionOptions = [
    { value: '9-10am', label: '9:00am - 10:00am' },
    { value: '3214', label: '10:00am -11:00am' },
    { value: '21CS423543', label: '11:00am - 12:00pm' },
    { value: '21C35S44', label: '12:20pm - 1:20pm' },
    { value: '21BE545', label: '2:00pm - 3:00pm' },
    { value: '21BE545', label: '3:00pm - 4:00pm' },
  ];
  
  
  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
  };

  const handleSessionChange = (selectedOptions) => {
    setSelectedSession(selectedOptions);
  };

  const stepOne = (
   <div>
       <h4 style={{paddingBottom: '10px', textAlign: 'center'}}>Create new Session</h4>

       <div style={{display: 'flex', justifyContent: 'center'}}>
       <div style={{ width: '360px',zIndex: '0' }}>
       <p htmlFor="subjectSelect" style={{paddingBottom: '1px',marginBottom: '3px'}}>Choose Subject:</p>
       <Select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange} options={subjectOptions}  /></div>
       </div>


       <div style={{display: 'flex', justifyContent: 'center'}}>
       <div style={{ width: '360px' }}>
       <p htmlFor="sessionSelect" style={{paddingBottom: '1px',marginBottom: '3px',paddingTop: '20px'}}>Choose Session Time:</p>
       <Select id="sessionSelect" value={selectedSession} onChange={handleSessionChange} options={sessionOptions} /></div>
       </div>


       <button className="submitAttendance"  onClick={() => {handleNext(); setProgress(1);}}>Next</button>

    </div>
  );


  const stepTwo = (
    <div className="mainContainer" style={{ overflow: 'hidden'}}>
      <h4 style={{paddingBottom: '10px', textAlign: 'center'}}>Take Attendance</h4>
      {studentCards}
      {attendance.length > 0 && presentCount === 0 && (
        <div className="buttonContainer">
        {progress > 0 && (
            <button className="multibutton" onClick={() => {setProgress(progress - 1); handlePrev();}}>
              Previous
            </button>
          )}
          <button className="multibutton" onClick={() => {submitAttendance(); handleNext(); setProgress(2);}}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
  
      const stepThree = (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
   <img src={success} alt="Success" style={{ maxHeight: '150px'}} />
    <h4 style={{ paddingBottom: '10px', textAlign: 'center',  }}> Attendance Recorded </h4>

    {presentCount > 0 && (
        <p>
          {presentCount}/{attendance.length} Present
        </p>
      )}
      {absentCount > 0 && (
        <p>
          {absentCount}/{attendance.length} Absent
        </p>
      )}
    <button className="submitAttendance" onClick={() => {setProgress(0); handlePrev(); handlePrev()}}>Return Home</button>
  </div>
);

return (
  <div className="App" style={{paddingTop: '95px'}}>
        <div className="progresscontainer">
          <AttendanceTable/>  
      <div className="steps">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={`circle ${currentStep >= step ? "active" : ""}`}
          >
            {step}
          </span>
        ))}
        <div className="progress-bar">
          <span
            className="indicator"
            style={{
              width: `${((currentStep - 1) / 2) * 100}%`,
            }}
          ></span>
        </div>
      </div>
      </div>
    <header className="App-header">
    </header>
    <main className="containerr">
      {progress === 0 && stepOne}
      {progress === 1 && stepTwo}
      {progress === 2 && stepThree}
    </main>
  </div>
)};