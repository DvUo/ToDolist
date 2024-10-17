// helper/api.js
const API_URL = 'https://66e44bf6d2405277ed13d326.mockapi.io/api/v01/task';


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


export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/xml' ,
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};


export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};