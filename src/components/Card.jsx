import "./Card.css"; 

export const Card = ({ tasks, title, onEdit }) => {

  
  return (
    <div className={`cards ${title}`}>
      <h3>{title}</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li className="li-task" key={index}>
              <button className="btn btn-task" onClick={() => onEdit(task)}>
                <p className="date">
                  {new Date(task.daytime).toLocaleDateString()}
                </p>
                <i className="fas fa-pencil-alt"></i>
                {title === "Done" ? <i className="fas fa-star"></i> : ""}
                {task.title}
              </button>
            </li>
          ))
        ) : (
          <li>Add more tasks...</li>
        )}
      </ul>
    </div>
  );
};


