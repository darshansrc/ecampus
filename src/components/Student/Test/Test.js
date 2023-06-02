// import React, { useState, useEffect } from "react";
// import { useUserAuth } from "../../Backend/context/UserAuthContext";
// import { db } from "../../Backend/Firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";

// const Test = () => {
//   const { user } = useUserAuth();
//   const [subjects, setSubjects] = useState({});
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   const getUserData = async (uid) => {
//     try {
//       const userRef = doc(db, "users", uid);
//       const userDoc = await getDoc(userRef);
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         setSubjects(userData.subject);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       getUserData(user.uid);
//     }
//   }, [user]);

//   const handleSubjectChange = (event) => {
//     setSelectedSubject(event.target.value);
//   };

//   return (
//     <>
//       <div style={{ marginTop: "75px" }}>
//         <div className="p-4 box mt-3 text-center">
//           {user && user.photoURL && (
//             <img
//               src={user.photoURL}
//               alt="Profile"
//               style={{ width: "100px", borderRadius: "50px" }}
//             />
//           )}
//           <h2>Welcome {user && user.displayName}</h2>
//           {user && <p>Email: {user.email}</p>}
//           {Object.keys(subjects).length > 0 && (
//             <div>
          
//               <select value={selectedSubject} onChange={handleSubjectChange}>
//                 <option value="">Select a subject</option>
//                 {Object.entries(subjects).map(([key, value]) => (
//                   <option key={key} value={key}>
//                     {''+key+' ('+value+')'}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Test;\
import React from 'react'

const Test = () => {
  return (
    <div>Test</div>
  )
}

export default Test
