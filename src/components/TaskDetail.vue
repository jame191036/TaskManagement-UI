<template>
  <div class="container">
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="ms-4 mt-4">
      <h2 class="mb-3">Task Detail</h2>
      <p class="fw-bold">Task No: {{ taskNo }}</p>

      <label class="form-label">Title Task</label>
      <input type="text" class="form-control mb-3" v-model="taskTitle">

      <p>Detail</p>
      <textarea rows="4" cols="50" class="form-control mb-3" v-model="taskDetail"></textarea>

      <div class="mt-3">
        <label for="taskStatus" class="form-label">Status</label>
        <select v-model="selectedPriority" id="taskStatus" class="form-select">
          <option disabled value="">Status</option>
          <option v-for="status in statusAll" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>
      </div>

      <div class="mt-4">
        <h3 class="mb-3">Upload an Image</h3>
        <input type="file" @change="onFileChange" class="form-control mb-3" accept="image/*" />

        <div v-if="imagePreview" class="mt-3">
          <h3>Image Preview:</h3>
          <img :src="imagePreview" alt="Image Preview" class="img-fluid" width="300" />
        </div>
      </div>

      <!-- Comments Section -->
      <div class="mt-4">
        <h3>Comments</h3>
        <div v-if="comments && comments.length > 0" class="mb-3">
          <ul>
            <li v-for="(comment, index) in comments" :key="index" class="mb-2">
              <p><strong>Comment {{ index + 1 }}</strong></p>
              <p class="ps-4">{{ comment.description }}</p>
              <p class="ps-4 text-muted"><small>{{ formatDate(comment.modifyDate) }}</small></p>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No comments available.</p>
        </div>
      </div>

      <div class="mt-2">
        <p class="mt-3">Add a Comment</p>
        <div class="ps-4 mb-2">
          <textarea rows="3" class="form-control" v-model="comment"></textarea>
        </div>
        <hr>
      </div>

    </div>

    <div class="text-center mt-4 mb-4">
      <button @click="handleSave" class="btn btn-success">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api.js'; // Adjust path as necessary
import axios from 'axios';

export default {
  props: ['id'],
  setup(props) {
    const id = ref(null);
    const taskNo = ref('');
    const taskTitle = ref('');
    const taskDetail = ref('');
    const comment = ref('');
    const comments = ref([]);
    const selectedPriority = ref('');
    const priorities = ref(['To do', 'In progress', 'Waiting for deploy', 'Ready for test', 'Re-Open', 'Closed']);
    const statusAll = ref(null);
    const router = useRouter();

    const selectedFile = ref(null);
    const imagePreview = ref(null);
    const imageId = ref(null);

    const isLoading = ref(false);
   
    const GetTaskById = async () => {
      if (props.id == 0) {
        return;
      }

      try {
        const response = await apiClient.get(`/TaskManagementOverView/GetTaskById/${props.id}`);
        const task = response.data;
        taskNo.value = task.taskNo;
        taskTitle.value = task.title || '';
        taskDetail.value = task.description || '';
        selectedPriority.value = task.status || '';
      } catch (error) {
        console.error('Error fetching task:', error.message);
      }
    };

    const GetTaskCommentById = async () => {
      if (props.id == 0) {
        return;
      }

      try {
        const response = await apiClient.get(`/TaskComments/GetTaskCommentById/${props.id}`);
        comments.value = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    const FetchImage = async () => {
      if (props.id == 0) {
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7292/api/TaskImage/GetImage?taskId=${props.id}`);

        if (response.data && response.data.imageUrl) {
          imagePreview.value = response.data.imageUrl;
          imageId.value = response.data.imageId;
        } else {
          console.warn('No image URL found in the response');
        }
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };

    const masterStatus = async () => {
      try {
        const response = await apiClient.get('/TaskMaster/GetMasterStatus');

        if (response.data) {
          statusAll.value = response.data
          // console.log(statusAll.value);
        } else {
          console.warn('No image URL found in the response');
        }
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };

    // Function to handle file input change
    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;

        // Create a preview using FileReader
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result; // Update the image preview
        };

        imageId.value = null;
        reader.readAsDataURL(file);
      }
    };

    // Function to upload image
    const UploadImage = async () => {
      if (!selectedFile.value || imageId.value != null) {
        return;
      }

      const formData = new FormData();
      formData.append('taskId', props.id == 0 ? id.value : props.id);
      formData.append('file', selectedFile.value);

      const response = await axios.post('https://localhost:7292/api/TaskImage/UploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log('Image upload response:', response.data);
    };

    // Function to handle saving the task and comments
    const handleSave = async () => {
      isLoading.value = true;

      try {
        id.value = await SaveTask();
        
        await SaveComment();
        await UploadImage();
        alert('Task saved successfully!');
        router.push({ name: 'TaskList' });
      } catch (error) {
        console.error('Error saving task:', error.message);
        alert('Failed to save task. Please try again.');
      } finally {
        isLoading.value = false; // End loading
      }
    };

    // Function to save task details
    const SaveTask = async () => {
      const formData = {
        TaskId: props.id == 0 ? null : props.id,
        Title: taskTitle.value,
        Description: taskDetail.value,
        Status: selectedPriority.value,
      };

      const result = await apiClient.post('/TaskManagementOverView/UpdateTask', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      return await result.data
    };

    // Function to save a comment
    const SaveComment = async () => {
      if (!comment.value) {
        return;
      }

      const formData = {
        TaskId: props.id == 0 ? id.value : props.id,
        Description: comment.value,
      };
      await apiClient.post('/TaskComments/InsertTaskComments', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
    };

    // Format date for display
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    onMounted(async () => {
      isLoading.value = true; // Start loading state

      try {
        await GetTaskById();
        await GetTaskCommentById();
        await FetchImage();
        await masterStatus();
      } catch (error) {
        console.error('Error during data fetching:', error);
      } finally {
        isLoading.value = false; // End loading state
      }
    });

    return {
      taskTitle,
      taskDetail,
      comment,
      comments,
      selectedPriority,
      priorities,
      selectedFile,
      imagePreview,
      onFileChange,
      UploadImage,
      handleSave,
      formatDate,
      statusAll,
      taskNo,
      isLoading,
    };
  },
};
</script>

<style scoped>
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
