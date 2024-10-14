import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import Card from "./Card"; // Asegúrate de ajustar la ruta si es necesario
import "./AddTask.css";

Modal.setAppElement("#root");

export const AddTask = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("To do");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // Almacena las tareas

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task, date, status, description };
    setTasks([...tasks, newTask]); // Añadir nueva tarea a la lista
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            backgroundColor: "#333",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            padding: "20px",
          },
        }}
      >
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
      </Modal>

      <div className="task-cards">
        <Card title="To do" tasks={todoTasks} />
        <Card title="Doing" tasks={doingTasks} />
        <Card title="Done" tasks={doneTasks} />
      </div>
    </>
  );
};
