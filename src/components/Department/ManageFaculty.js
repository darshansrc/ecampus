


import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../Backend/Firebase/firebase"; // assuming you've already initialized your Firestore instance
import './ManageFaculty.css'

const ManageFaculty = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "ISE", "faculty", email), { name, email });
      setMessage("Faculty added successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      setMessage("Error adding faculty: " + error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "ISE", "faculty", email), { name });
      setMessage("Faculty updated successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      setMessage("Error updating faculty: " + error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "ISE", "faculty", email));
      setMessage("Faculty deleted successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      setMessage("Error deleting faculty: " + error.message);
    }
  };

  return (
    <div style={{paddingTop: '75px'}}>
      <form onSubmit={handleAdd}>
        <h2>Add Faculty</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h2>Update Faculty</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>

      <form onSubmit={handleDelete}>
        <h2>Delete Faculty</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Delete</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ManageFaculty;
