import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles.css";

function CreateTask() {
  const [task, setTask] = useState({ title: "", description: "", assignedTo: "" });

  const submit = async () => {
    await API.post("/tasks", task);
    alert("Created!");
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Create Task</h2>

          <input placeholder="Title"
            onChange={(e)=>setTask({...task,title:e.target.value})}/>

          <input placeholder="Description"
            onChange={(e)=>setTask({...task,description:e.target.value})}/>

          <input placeholder="Assign User ID"
            onChange={(e)=>setTask({...task,assignedTo:e.target.value})}/>

          <button onClick={submit}>Create</button>
        </div>
      </div>
    </>
  );
}

export default CreateTask;