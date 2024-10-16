import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, OffCanvasFocus } from "./";
import "./AddTask.css";

export const AddTask = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("To do");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task, date, status, description };
    
    if (isEditing && taskToEdit) {
      const updatedTasks = tasks.map((t) => (t === taskToEdit ? newTask : t));
      setTasks(updatedTasks);
      setIsEditing(false);
    } else {
      setTasks([...tasks, newTask]);
    }

    resetForm();
    setIsModalOpen(false);
  };
  
  const handleDelete = () => {
    const updatedTasks = tasks.filter((t) => t !== taskToEdit);
    setTasks(updatedTasks);
    resetForm();
    setIsModalOpen(false);
  }

  const handleEdit = (task) => {
    setTask(task.task);
    setDate(new Date(task.date));
    setStatus(task.status);
    setDescription(task.description);
    setIsEditing(true);
    setTaskToEdit(task);
    setIsModalOpen(true);  
  };

  const resetForm = () => {
    setTask("");
    setDate(new Date());
    setStatus("To do");
    setDescription("");
    setTaskToEdit(null);
    setIsEditing(false);
  };

  const doneTasks = tasks.filter((t) => t.status === "Done");
  const doingTasks = tasks.filter((t) => t.status === "Doing");
  const todoTasks = tasks.filter((t) => t.status === "To do");

  return (
    <>
      <div className="button-container">
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="btn btn-add"
        >
          Add Task
        </button>
      </div>

      <OffCanvasFocus
        onOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form className="add-form" onSubmit={handleSubmit}>
          <label className="labels-form" htmlFor="task">
            Task
          </label>
          <input
            type="text"
            id="task"
            placeholder="Add Task"
            value={task}
            minLength={3}
            maxLength={50}
            onChange={(e) => setTask(e.target.value)}
            required
          />

          <label className="labels-form" htmlFor="day-time">
            Day & Time
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
          />

          <label className="labels-form" htmlFor="state">
            Set State
          </label>
          <select
            name="states"
            id="state"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Done">Done</option>
            <option value="Doing">Doing</option>
            <option value="To do">To do</option>
          </select>

          <label className="labels-form" htmlFor="description">
            Task Description
          </label>
          <textarea
            id="description"
            rows={5}
            maxLength={400}
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit" className="btn btn-block">
            {isEditing ? "Update Task" : "Save Task"}
          </button>

          {isEditing ? (
            <button type="submit" onClick={handleDelete} className="btn btn-danger">Delete</button>
          ) : (
            ""
          )}
        </form>
      </OffCanvasFocus>

      <div className="task-cards">
        <Card title="To do" tasks={todoTasks} onEdit={handleEdit} />
        <Card title="Doing" tasks={doingTasks} onEdit={handleEdit} />
        <Card title="Done" tasks={doneTasks} onEdit={handleEdit} />
      </div>
    </>
  );
};
