<template>
  <div class="ms-2">
    <form @submit.prevent="addDetail()">
      <!-- <input v-model="newTask" placeholder="Enter a task" /> -->
      <button type="submit" class="btn btn-success">Add Task</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // newTask: '',
    };
  },
  methods: {
    addDetail() {
      console.log('onSumit');
      this.$router.push({ name: 'TaskDetail', params: { id: 0 } });
      // this.$emit('add-task');
      this.newTask = ''; // Clear input after submission

      // if (this.newTask.trim()) {
      //   this.$emit('add-task', this.newTask);
      //   this.newTask = ''; // Clear input after submission
      // } else {
      //   alert('Task cannot be empty');
      // }
    },
  },
};
</script>

<style scoped>
/* Add your form styles here */
</style>
