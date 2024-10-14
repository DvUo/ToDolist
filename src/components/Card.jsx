import "./Card.css"; // Asegúrate de ajustar la ruta si es necesario

const Card = ({ tasks, title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.task}</strong> - {task.date.toLocaleDateString()}
            </li>
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  );
};

export default Card;
