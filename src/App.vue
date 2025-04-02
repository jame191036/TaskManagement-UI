<template>
  <div id="app">
    <h1>Task Management App dsadfasdf</h1>
    <router-view />
    <!-- <TaskForm @add-task="addTask" /> -->
    <!-- <TaskList :tasks="tasks" @remove-task="removeTask" /> -->
  </div>
</template>

<script>
import { useTaskManagement } from './composables/useTaskManagement';
// import TaskForm from './components/TaskForm.vue';
// import TaskList from './components/TaskList.vue';

export default {
  // components: {
  //   TaskForm,
  //   TaskList,
  // },
  setup() {
    const { tasks, addTask, removeTask } = useTaskManagement();

    return {
      tasks,
      addTask,
      removeTask,
    };
  },
};
</script>

<style>
/* Add global styles here */
</style>
