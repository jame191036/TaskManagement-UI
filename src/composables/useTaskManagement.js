// src/composables/useTaskManagement.js
import { ref } from 'vue';

export function useTaskManagement() {
  const tasks = ref([]);

  const addTask = (taskName) => {
    if (typeof taskName === 'string' && taskName.trim()) {
      tasks.value.push({
        id: Date.now(),
        name: taskName.trim(), // Trim to avoid trailing spaces
      });
    } else {
      console.error('Invalid task name:', taskName);
    }
  };

  const removeTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  };

  return {
    tasks,
    addTask,
    removeTask,
  };
}
