import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Card, Focus} from "./"; 
import "./AddTask.css";

export const AddTask = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("To do");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task, date, status, description };
    setTasks([...tasks, newTask]); 
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setTask("");
    setDate(new Date());
    setStatus("To do");
    setDescription("");
  };

  // Filtrar tareas según su estado
  const doneTasks = tasks.filter((t) => t.status === "Done");
  const doingTasks = tasks.filter((t) => t.status === "Doing");
  const todoTasks = tasks.filter((t) => t.status === "To do");

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="btn btn-block">
        Add Task
      </button>

      <Focus isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
        <form className="add-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Add a New Task</legend>

            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              placeholder="Add Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            <label htmlFor="day-time">Day & Time</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
            />

            <label htmlFor="state">Set State</label>
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

            <label htmlFor="description">Task Description</label>
            <textarea
              id="description"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button type="submit" className="btn btn-block">
              Save Task
            </button>
          </fieldset>
        </form>
      </Focus>

      <div className="task-cards">
        <Card title="To do" tasks={todoTasks} />
        <Card title="Doing" tasks={doingTasks} />
        <Card title="Done" tasks={doneTasks} />
      </div>
    </>
  );
};
