import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  const email = localStorage.getItem("email");

  // 📌 FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch {
      console.log("Users fetch failed");
    }
  };

  // 📌 FETCH TASKS (ONLY USER)
  const fetchTasks = async () => {
    const res = await API.get("/tasks");

    const filtered = res.data.filter(
      (t) => t.assignedTo?.email === email
    );

    setTasks(
      status
        ? filtered.filter((t) => t.status === status)
        : filtered
    );
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [status]);

  // ✅ MARK DONE
  const markDone = async (id) => {
    await API.put(`/tasks/${id}`, { status: "DONE" });
    fetchTasks();
  };

  // ✏️ EDIT TASK
  const editTask = async (task) => {
    const newTitle = prompt("Edit title", task.title);
    if (!newTitle) return;

    await API.put(`/tasks/${task.id}`, {
      ...task,
      title: newTitle,
    });

    fetchTasks();
  };

  // ❌ DELETE TASK
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // 👤 ASSIGN TASK
  const assignTask = async (taskId, userId) => {
    await API.put(`/tasks/${taskId}`, {
      assignedTo: userId,
    });

    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        {/* FILTER */}
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        {/* TASK LIST */}
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          tasks.map((t) => (
            <div className="card" key={t.id}>
              <h3>{t.title}</h3>
              <p>{t.description}</p>

              <p
                style={{
                  color:
                    t.status === "DONE"
                      ? "green"
                      : t.status === "IN_PROGRESS"
                      ? "orange"
                      : "red",
                }}
              >
                Status: {t.status}
              </p>

              <p>
                Assigned To: {t.assignedTo?.email || "None"}
              </p>

              {/* 👤 ASSIGN DROPDOWN */}
              <select
                onChange={(e) =>
                  assignTask(t.id, e.target.value)
                }
              >
                <option>Assign User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.email}
                  </option>
                ))}
              </select>

              {/* BUTTONS */}
              <div style={{ marginTop: "10px" }}>
                {t.status !== "DONE" && (
                  <button onClick={() => markDone(t.id)}>
                    Done
                  </button>
                )}

                <button onClick={() => editTask(t)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(t.id)}
                  style={{ background: "red" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Dashboard;