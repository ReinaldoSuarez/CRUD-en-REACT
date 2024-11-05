
import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Create Task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  // Update Task
  const updateTask = () => {
    setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
    setEditMode(false);
    setCurrentTask(null);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Enable Edit Mode
  const enableEditMode = (task) => {
    setEditMode(true);
    setCurrentTask(task);
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Ingresa una Tarea"
        value={editMode ? currentTask.text : newTask}
        onChange={(e) => editMode ? setCurrentTask({ ...currentTask, text: e.target.value }) : setNewTask(e.target.value)}
      />
      <button onClick={editMode ? updateTask : addTask}>
        {editMode ? 'Actualiza Tarea' : 'Agrega Tarea'}
      </button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => enableEditMode(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
