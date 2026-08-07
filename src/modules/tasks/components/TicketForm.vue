<template>
    <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
            <label class="mb-1 block text-sm font-medium">
                Title <span class="text-red-500">*</span>
            </label>

            <BaseInput v-model="form.title" placeholder="Enter ticket title" />
        </div>

        <div>
            <label class="mb-1 block text-sm font-medium">
                Description
            </label>

            <BaseTexarea v-model="form.description" rows="4" placeholder="Add a description (optional)" />
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="mb-1 block text-sm font-medium">
                    Priority
                </label>

                <BaseSelect v-model="form.priorityId" :options="priorityOptions" />
            </div>

            <div>
                <label class="mb-1 block text-sm font-medium">
                    Status
                </label>

                <BaseSelect v-model="form.statusId" :options="statusOptions" />
            </div>
        </div>

        <div>
            <label class="mb-1 block text-sm font-medium">
                Assignee
            </label>

            <BaseSelect v-model="form.assigneeId" :options="assigneeOptions" placeholder="Unassigned" />
        </div>
    </form>
</template>

<script setup>
import BaseInput from '@/shared/ui/component/BaseInput.vue'
import BaseSelect from '@/shared/ui/component/BaseSelect.vue'
import BaseTexarea from '@/shared/ui/component/BaseTexarea.vue'

defineProps({
    form: {
        type: Object,
        required: true
    },
    priorityOptions: {
        type: Array,
        default: () => []
    },
    statusOptions: {
        type: Array,
        default: () => []
    },
    assigneeOptions: {
        type: Array,
        default: () => []
    },
})

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
    emit("submit");
};
</script>