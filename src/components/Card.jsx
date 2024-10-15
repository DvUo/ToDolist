import "./Card.css"; // Asegúrate de ajustar la ruta si es necesario

export const Card = ({ tasks, title }) => {
  return (
    <div className="card `${ads}`">  //añadir tipo con variable pasada por props
      <h3>{title}</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <h2>{task.task}</h2> - {task.date.toLocaleDateString()}
            </li>
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  );
};


