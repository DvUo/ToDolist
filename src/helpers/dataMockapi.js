

export const MockApiData = async() => {
    const url = 'https://66e44bf6d2405277ed13d326.mockapi.io/api/v01/task'
    const resp = await fetch(url);
    const { data } = await resp.json();

    const tasks = data.map(
        task => ({
            name: task.name,
            daytime: task.daytime,
            state: task.state,
            description: task.description,
        }));
    console.log(tasks);
    return tasks;
}