/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api.js'; // Adjust path as necessary
import TaskForm from './TaskForm.vue';
import * as bootstrap from 'bootstrap'; // Bootstrap JS for modals
export default (await import('vue')).defineComponent({
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
            }
            catch (error) {
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
            }
            catch (error) {
                console.error('Error deleting task:', error.message);
            }
        };
        const getNotiEmail = async () => {
            try {
                const response = await apiClient.get('/NotiEmail/GetNotiEmail');
                emailNoti.value = response.data;
            }
            catch (error) {
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
            }
            catch (error) {
                alert('Error updating email:', error.message);
            }
            finally {
                isLoading.value = false; // End loading state
            }
        };
        onMounted(async () => {
            isLoading.value = true; // Start loading state
            try {
                await getOverView();
                await getNotiEmail();
            }
            catch (error) {
                console.error('Error during data fetching:', error);
            }
            finally {
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
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            TaskForm,
        },
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
    __VLS_styleScopedClasses['table'];
    __VLS_styleScopedClasses['table'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.link, __VLS_intrinsicElements.link)({ rel: ("stylesheet"), href: ("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"), });
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-overlay") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spinner-border text-primary") }, role: ("status"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("visually-hidden") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("ms-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mt-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("row") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("form-label mb-0") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("form-control mb-4") }, value: ((__VLS_ctx.emailNoti)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-3 mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.updateEmail();
            } }, type: ("button"), ...{ class: ("btn btn-success") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("bi bi-envelope") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.hr, __VLS_intrinsicElements.hr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mt-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("row") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("form-label mb-0") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("form-control mb-3") }, value: ((__VLS_ctx.searchTaskNo)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("form-label mb-0") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("form-control mb-3") }, value: ((__VLS_ctx.searchTitle)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-3 mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.searchTask();
            } }, type: ("button"), ...{ class: ("btn btn-secondary") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("bi bi-search") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.TaskForm;
    /** @type { [typeof __VLS_components.TaskForm, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onAddTask': {} }, }));
    const __VLS_2 = __VLS_1({ ...{ 'onAddTask': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onAddTask: (__VLS_ctx.addTask)
    };
    let __VLS_3;
    let __VLS_4;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({ ...{ class: ("table table-striped") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [task, index] of __VLS_getVForSourceType((__VLS_ctx.data))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((task.taskId)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (index + 1);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (task.taskNo);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (task.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (task.statusName);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (__VLS_ctx.formatDate(task.createDate));
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (__VLS_ctx.formatDate(task.modifyDate));
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.goToDetail(task.taskId);
                } }, ...{ class: ("btn btn-info me-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.confirmDeleteTask(task.taskId);
                } }, ...{ class: ("btn btn-danger") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal fade") }, id: ("deleteTaskModal"), tabindex: ("-1"), "aria-labelledby": ("deleteTaskModalLabel"), "aria-hidden": ("true"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-dialog") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({ ...{ class: ("modal-title") }, id: ("deleteTaskModalLabel"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("button"), ...{ class: ("btn-close") }, "data-bs-dismiss": ("modal"), "aria-label": ("Close"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-body") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-footer") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("button"), ...{ class: ("btn btn-secondary") }, "data-bs-dismiss": ("modal"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.deleteTask) }, type: ("button"), ...{ class: ("btn btn-danger") }, });
    __VLS_styleScopedClasses['loading-overlay'];
    __VLS_styleScopedClasses['spinner-border'];
    __VLS_styleScopedClasses['text-primary'];
    __VLS_styleScopedClasses['visually-hidden'];
    __VLS_styleScopedClasses['ms-4'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mt-3'];
    __VLS_styleScopedClasses['row'];
    __VLS_styleScopedClasses['col-3'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['mb-0'];
    __VLS_styleScopedClasses['form-control'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['col-3'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['btn'];
    __VLS_styleScopedClasses['btn-success'];
    __VLS_styleScopedClasses['bi'];
    __VLS_styleScopedClasses['bi-envelope'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mt-3'];
    __VLS_styleScopedClasses['row'];
    __VLS_styleScopedClasses['col-3'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['mb-0'];
    __VLS_styleScopedClasses['form-control'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['col-3'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['mb-0'];
    __VLS_styleScopedClasses['form-control'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['col-3'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['btn'];
    __VLS_styleScopedClasses['btn-secondary'];
    __VLS_styleScopedClasses['bi'];
    __VLS_styleScopedClasses['bi-search'];
    __VLS_styleScopedClasses['table'];
    __VLS_styleScopedClasses['table-striped'];
    __VLS_styleScopedClasses['btn'];
    __VLS_styleScopedClasses['btn-info'];
    __VLS_styleScopedClasses['me-2'];
    __VLS_styleScopedClasses['btn'];
    __VLS_styleScopedClasses['btn-danger'];
    __VLS_styleScopedClasses['modal'];
    __VLS_styleScopedClasses['fade'];
    __VLS_styleScopedClasses['modal-dialog'];
    __VLS_styleScopedClasses['modal-content'];
    __VLS_styleScopedClasses['modal-header'];
    __VLS_styleScopedClasses['modal-title'];
    __VLS_styleScopedClasses['btn-close'];
    __VLS_styleScopedClasses['modal-body'];
    __VLS_styleScopedClasses['modal-footer'];
    __VLS_styleScopedClasses['btn'];
    __VLS_styleScopedClasses['btn-secondary'];
    __VLS_styleScopedClasses['btn'];
    __VLS_styleScopedClasses['btn-danger'];
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
//# sourceMappingURL=TaskList.vue.js.map