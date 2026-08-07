<template>
    <Dialog v-model="open" class="p-5">
        <DialogContent>
            <div class="relative mb-6">
                <h2 class="text-xl font-semibold">
                    Create New Ticket
                </h2>

                <div class="absolute top-0 right-0">
                    <DialogClose />
                </div>
            </div>

            <TicketForm :form="form" :priority-options="priorityOptions" :status-options="statusOptions"
                :assignee-options="assigneeOptions" />
        </DialogContent>

        <DialogFooter>
            <BaseButton variant="tertiary" @click="open = false">
                Cancel
            </BaseButton>

            <BaseButton @click="createTicket">
                Create Ticket
            </BaseButton>
        </DialogFooter>
    </Dialog>
</template>

<script setup>
import { reactive, ref, watch } from "vue"
import TicketForm from "./TicketForm.vue"
import DialogContent from "@/shared/ui/component/dialog/DialogContent.vue"
import DialogHeader from "@/shared/ui/component/dialog/DialogHeader.vue"
import DialogFooter from "@/shared/ui/component/dialog/DialogFooter.vue"
import BaseButton from "@/shared/ui/component/BaseButton.vue"
import Dialog from "@/shared/ui/component/dialog/Dialog.vue"
import DialogClose from "@/shared/ui/component/dialog/DialogClose.vue"
import { getAssignees, getTicketPriorities, getTicketStatuses } from "../services/index.js"

const open = defineModel({
    default: false,
})

const emit = defineEmits(["submit"])

const priorityOptions = ref([]);
const statusOptions = ref([]);
const assigneeOptions = ref([]);

const form = reactive({
    title: "",
    description: "",
    priorityId: "",
    statusId: "",
    assigneeId: "",
})

const loadOptions = async () => {
    try {
        const [priorityRes, statusRes, assigneeRes] = await Promise.all([
            getTicketPriorities(),
            getTicketStatuses(),
            getAssignees()
        ]);

        priorityOptions.value = priorityRes.data.data.map((item) => ({
            label: item.name,
            value: item.id,
        }));

        statusOptions.value = statusRes.data.data.map((item) => ({
            label: item.name,
            value: item.id,
        }));

        assigneeOptions.value = assigneeRes.data.data.map(item => ({
            label: item.username,
            value: item.id,
        }));

        form.priorityId =
            priorityOptions.value.find(item => item.label === "Medium")?.value ?? null;

        form.statusId =
            statusOptions.value.find(item => item.label === "To Do")?.value ?? null;
    } catch (error) {
        console.error(error);
    }
};

watch(open, async (value) => {
    if (value) {
        await loadOptions();
    }
});

const createTicket = () => {
    emit("submit", { ...form })
    open.value = false
}
</script>