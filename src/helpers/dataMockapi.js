const API_URL = 'https://classic-jerrine-universidad-autonoma-a8d37108.koyeb.app/api/tasks';

// Obtener tareas
export const getTasks = async () => {
  try {
    const response = await fetch(API_URL, { mode: 'no-cors' });
    if (!response.ok) {
      console.error('Error en getTasks:', response.statusText);
      throw new Error('No se pudieron obtener las tareas');
    }
    // NOTA: En modo no-cors, no se puede acceder al contenido de la respuesta.
    return [];
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    throw error;
  }
};

// Crear tarea
export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      console.error('Error en createTask:', response.statusText);
      throw new Error('No se pudo crear la tarea');
    }
    // En modo no-cors no puedes leer el contenido de la respuesta.
    return null;
  } catch (error) {
    console.error('Error al crear tarea:', error);
    throw error;
  }
};

// Actualizar tarea
export const updateTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      console.error('Error en updateTask:', response.statusText);
      throw new Error('No se pudo actualizar la tarea');
    }
    return null; // Respuesta opaca
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    throw error;
  }
};

// Eliminar tarea
export const deleteTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'DELETE',
      mode: 'no-cors',
    });
    if (!response.ok) {
      console.error('Error en deleteTask:', response.statusText);
      throw new Error('No se pudo eliminar la tarea');
    }
    return null; // Respuesta opaca
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    throw error;
  }
};
