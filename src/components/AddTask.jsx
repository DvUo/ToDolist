import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, OffCanvasFocus } from "./";
import { getTasks, createTask, updateTask, deleteTask } from '../helpers/dataMockapi'; 
import "./AddTask.css";

export const AddTask = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("To do");
  const [description, setDescription] = useState(" ");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);


  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title: title,
      daytime: date.toISOString().split('T')[0], 
      status,
      description,
    };

    if (isEditing && taskToEdit) {
      await updateTask(taskToEdit, newTask);
      const updatedTasks = tasks.map((t) =>
        t.id === taskToEdit.id ? { ...newTask, id: taskToEdit.id } : t
      );
      setTasks(updatedTasks);
      setIsEditing(false);
    } else {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, { ...createdTask, daytime: createdTask.daytime }]);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteTask(taskToEdit);
    const updatedTasks = tasks.filter((t) => t.id !== taskToEdit.id);
    setTasks(updatedTasks);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDate((task.daytime));
    setStatus(task.status);
    setDescription(task.description);
    setIsEditing(true);
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
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
        <form id="form-tasks" className="add-form" onSubmit={(handleSubmit)}>
          <label className="labels-form" htmlFor="title">
            Title Task
          </label>
          <input
            type="text"
            id="title"
            placeholder="Add title"
            value={title}
            minLength={3}
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="labels-form">
            Day & Time
          </label>
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)} 
            dateFormat="dd/MM/yyyy"
            timeFormat="HH:mm"
            timeIntervals={15}
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
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          ) : null}
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