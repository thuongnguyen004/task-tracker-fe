<template>

    <div class="grid grid-cols-[2fr_1fr] gap-6 px-6">

        <div>
            <TicketDescription />
            <TicketTabs />
        </div>

        <TicketSidebar />
    </div>

</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import TicketDescription from '../components/TicketDescription.vue';
import TicketTabs from '../components/tabs/TicketTabs.vue';

import TicketSidebar from '../components/TicketSidebar.vue';

</script>
