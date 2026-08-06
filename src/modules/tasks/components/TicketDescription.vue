<template>
    <div>
        <div class="space-y-2">
            <div class="space-y-1">
                <div class="flex gap-4">
                    <p class="text-sm text-tertiary">TICKET-001</p>
                    <PriorityBadge priority="HIGH" />
                </div>

                <h2 class="text-3xl font-bold text-primary">Set up project repository and CI/CD pipeline</h2>

                <div class="flex items-center text-sm text-tertiary">
                    <span>Created by Alex Lee</span>

                    <span class="mx-2 h-1 w-1 scale-75 rounded-full bg-quaternary"></span>

                    <span>2 days ago</span>

                    <span class="mx-2 h-1 w-1 scale-75 rounded-full bg-quaternary"></span>

                    <span>Updated 3 hours ago</span>
                </div>

            </div>

            <div class=" text-tertiary">
                <p class="font-semibold text-tertiary">DESCRIPTION</p>

                <p class="whitespace-pre-line">
                    Initialize the Git repository with proper branching strategy.

                </p>
            </div>

        </div>

    </div>
</template>

<script setup>
import PriorityBadge from '@/shared/ui/component/badges/PriorityBadge.vue';



</script>
