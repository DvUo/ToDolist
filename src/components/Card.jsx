import "./Card.css"; 

export const Card = ({ tasks, title, onEdit }) => {
  return (
    <div className={`cards ${title}`}>
      <h3>{title}</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li className="li-task" key={index}>
              <p className="date">{task.date.toLocaleDateString()}</p>
              <button className="btn btn-task" onClick={()=> onEdit(task)}> 
                {task.task}
                <i class="fas fa-chevron-down"></i>
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


