/// <reference types="../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
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
//# sourceMappingURL=TaskManagementIndex.vue.js.map