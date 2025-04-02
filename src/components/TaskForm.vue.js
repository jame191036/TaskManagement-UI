/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
export default (await import('vue')).defineComponent({
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("ms-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (...[$event]) => {
                __VLS_ctx.addDetail();
            } }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("btn btn-success") }, });
    __VLS_styleScopedClasses['ms-2'];
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
//# sourceMappingURL=TaskForm.vue.js.map