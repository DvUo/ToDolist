// helper/api.js
const API_URL = 'https://classic-jerrine-universidad-autonoma-a8d37108.koyeb.app/tasks';


export const getTasks = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  const tasks = data.map(task => ({
    ...task,
    daytime: task.daytime,
  }));
  return tasks;
};

export const createTask = async (task) => {

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  
  return data;
};


export const updateTask = async (task) => {
    const response = await fetch(`${API_URL}`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task), 
    });

    if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error en updateTask:', errorResponse);
        throw new Error('Error al actualizar la tarea');
    }

    return response.json();
};

export const deleteTask = async (task) => {
    const response = await fetch(`${API_URL}/${task.id}`, { 
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error en deleteTask:', errorResponse);
        throw new Error('Error al borrar la tarea');
    }

    return response.json();
};