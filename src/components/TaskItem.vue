<template>
  <div>
    <h2>Task List</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <button @click="$emit('remove-task', task.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tasks: Array,
  },
};
</script>

<style scoped>
/* Add item-specific styles here */
</style>
