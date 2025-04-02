<template>
    <p>teste</p>
    <!-- <useTaskManagement/> -->
</template>

<script>
// src/composables/useTaskManagement.js
import { ref } from 'vue';

export function useTaskManagement() {
  const tasks = ref([]);

  const addTask = (taskName) => {
    if (taskName.trim()) {
      tasks.value.push({
        id: Date.now(),
        name: taskName,
      });
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

</script>

<style scoped>
</style>
