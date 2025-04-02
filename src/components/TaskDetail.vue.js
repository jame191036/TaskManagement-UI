/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api.js'; // Adjust path as necessary
import axios from 'axios';
export default (await import('vue')).defineComponent({
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
            }
            catch (error) {
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
            }
            catch (error) {
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
                }
                else {
                    console.warn('No image URL found in the response');
                }
            }
            catch (error) {
                console.error('Error fetching image:', error.message);
            }
        };
        const masterStatus = async () => {
            try {
                const response = await apiClient.get('/TaskMaster/GetMasterStatus');
                if (response.data) {
                    statusAll.value = response.data;
                    // console.log(statusAll.value);
                }
                else {
                    console.warn('No image URL found in the response');
                }
            }
            catch (error) {
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
            }
            catch (error) {
                console.error('Error saving task:', error.message);
                alert('Failed to save task. Please try again.');
            }
            finally {
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
            return await result.data;
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
            }
            catch (error) {
                console.error('Error during data fetching:', error);
            }
            finally {
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
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-overlay") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spinner-border text-primary") }, role: ("status"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("visually-hidden") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("ms-4 mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("mb-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("fw-bold") }, });
    (__VLS_ctx.taskNo);
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("form-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("form-control mb-3") }, value: ((__VLS_ctx.taskTitle)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ rows: ("4"), cols: ("50"), ...{ class: ("form-control mb-3") }, value: ((__VLS_ctx.taskDetail)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("taskStatus"), ...{ class: ("form-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.selectedPriority)), id: ("taskStatus"), ...{ class: ("form-select") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ disabled: (true), value: (""), });
    for (const [status] of __VLS_getVForSourceType((__VLS_ctx.statusAll))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((status.value)), value: ((status.value)), });
        (status.label);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("mb-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.onFileChange) }, type: ("file"), ...{ class: ("form-control mb-3") }, accept: ("image/*"), });
    if (__VLS_ctx.imagePreview) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.imagePreview)), alt: ("Image Preview"), ...{ class: ("img-fluid") }, width: ("300"), });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    if (__VLS_ctx.comments && __VLS_ctx.comments.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        for (const [comment, index] of __VLS_getVForSourceType((__VLS_ctx.comments))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((index)), ...{ class: ("mb-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (index + 1);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("ps-4") }, });
            (comment.description);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("ps-4 text-muted") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
            (__VLS_ctx.formatDate(comment.modifyDate));
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("ps-4 mb-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ rows: ("3"), ...{ class: ("form-control") }, value: ((__VLS_ctx.comment)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.hr, __VLS_intrinsicElements.hr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center mt-4 mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleSave) }, ...{ class: ("btn btn-success") }, });
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['loading-overlay'];
    __VLS_styleScopedClasses['spinner-border'];
    __VLS_styleScopedClasses['text-primary'];
    __VLS_styleScopedClasses['visually-hidden'];
    __VLS_styleScopedClasses['ms-4'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['fw-bold'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['form-control'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['form-control'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['mt-3'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['form-select'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['form-control'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['mt-3'];
    __VLS_styleScopedClasses['img-fluid'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['ps-4'];
    __VLS_styleScopedClasses['ps-4'];
    __VLS_styleScopedClasses['text-muted'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['mt-3'];
    __VLS_styleScopedClasses['ps-4'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['form-control'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['btn'];
    __VLS_styleScopedClasses['btn-success'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
//# sourceMappingURL=TaskDetail.vue.js.map