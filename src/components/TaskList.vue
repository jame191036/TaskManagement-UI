<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>


  <div class="ms-4">
    <!-- <h2>Task List</h2> -->
    <!-- Table for displaying tasks -->
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <label class="form-label mb-0">Email Notification</label>
          <input type="text" class="form-control mb-4" v-model="emailNoti">
        </div>
        <div class="col-3 mt-4">
          <button type="button" class="btn btn-success" @click="updateEmail()">
            <i class="bi bi-envelope"></i> Change Email
          </button>
        </div>
      </div>
    </div>

    <hr>

    <div class="container mt-3">
      <h3>Filter</h3>
      <div class="row">
        <div class="col-3">
          <label class="form-label mb-0">Task No.</label>
          <input type="text" class="form-control mb-3" v-model="searchTaskNo">
        </div>
        <div class="col-3">
          <label class="form-label mb-0">Title Task</label>
          <input type="text" class="form-control mb-3" v-model="searchTitle">
        </div>
        <div class="col-3 mt-4">
          <button type="button" class="btn btn-secondary" @click="searchTask()">
            <i class="bi bi-search"></i> Search
          </button>
        </div>
      </div>
    </div>



    <TaskForm @add-task="addTask" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Task No.</th>
          <th>Title</th>
          <th>Status</th>
          <th>Create Date</th>
          <th>Modify Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in data" :key="task.taskId">
          <td>{{ index + 1 }}</td>
          <td>{{ task.taskNo }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.statusName }}</td>
          <td>{{ formatDate(task.createDate) }}</td>
          <td>{{ formatDate(task.modifyDate) }}</td>
          <td>
            <button @click="goToDetail(task.taskId)" class="btn btn-info me-2">Go to Detail</button>
            <button @click="confirmDeleteTask(task.taskId)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for confirming delete -->
    <div class="modal fade" id="deleteTaskModal" tabindex="-1" aria-labelledby="deleteTaskModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteTaskModalLabel">Delete Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this task?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteTask">Confirm Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api.js'; // Adjust path as necessary
import TaskForm from './TaskForm.vue';
import * as bootstrap from 'bootstrap';  // Bootstrap JS for modals

export default {
  components: {
    TaskForm,
  },
  setup() {
    const data = ref([]);
    const router = useRouter();
    const selectedTaskId = ref(null);
    const searchTaskNo = ref(null);
    const searchTitle = ref(null);
    const emailNoti = ref('');
    const isLoading = ref(false);

    const getOverView = async () => {
      try {
        // const response = await apiClient.get('/TaskManagementOverView/GetOverView'); 
        const formData = {
          title: null,
          taskNo: null,
        };
        const response = await apiClient.post('/TaskManagementOverView/GetOverView', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        data.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const goToDetail = (taskId) => {
      console.log('Navigating to TaskDetail with id:', taskId);
      router.push({ name: 'TaskDetail', params: { id: taskId } });
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    const confirmDeleteTask = (taskId) => {
      selectedTaskId.value = taskId;
      const modalElement = document.getElementById('deleteTaskModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    };

    const searchTask = async () => {
      isLoading.value = true;
      try {
        const formData = {
          title: searchTitle.value,
          taskNo: searchTaskNo.value,
        };
        const response = await apiClient.post('/TaskManagementOverView/GetOverView', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        data.value = response.data;
      }
      catch (error) {
        console.error('Error deleting task:', error.message);
      }
      finally {
        isLoading.value = false; // End loading state
      }
    };

    const deleteTask = async () => {
      if (!selectedTaskId.value) {
        return;
      }

      try {
        const response = await apiClient.get(`/TaskManagementOverView/DeleteTaskById?taskId=${selectedTaskId.value}`);
        console.log('Task deleted:', response.data);

        const modalElement = document.getElementById('deleteTaskModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.hide();

        data.value = data.value.filter(task => task.taskId !== selectedTaskId.value);
        selectedTaskId.value = null;

        window.location.reload();
      } catch (error) {
        console.error('Error deleting task:', error.message);
      } 
    };

    const getNotiEmail = async () => {
      try {
        const response = await apiClient.get('/NotiEmail/GetNotiEmail');
        emailNoti.value = response.data
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const isValidEmail = (email) => {
      // Regular expression for validating an email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const updateEmail = async () => {
      isLoading.value = true; // Start loading state

      if (!isValidEmail(emailNoti.value)) {
        alert('Please enter a valid email address.');
        return;
      }

      try {
        const response = await apiClient.get(`/NotiEmail/UpdateNotiEmail?email=${emailNoti.value}`);
        if (response.status == 200) {
          alert('Email updated successfully:', response.data);
        }
      } catch (error) {
        alert('Error updating email:', error.message);
      } finally {
        isLoading.value = false; // End loading state
      }
    };

    onMounted(async () => {
      isLoading.value = true; // Start loading state

      try {
        await getOverView();
        await getNotiEmail();
      } catch (error) {
        console.error('Error during data fetching:', error);
      } finally {
        isLoading.value = false; // End loading state
      }
    });

    return {
      data,
      getOverView,
      confirmDeleteTask,
      deleteTask,
      formatDate,
      goToDetail,
      searchTaskNo,
      searchTitle,
      searchTask,
      emailNoti,
      updateEmail,
      isLoading
    };
  },
};
</script>


<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
}

.table th,
.table td {
  text-align: center;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
