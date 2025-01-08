<script setup lang="ts">
import { ref,watch } from 'vue';
import Card from '@components/Card.vue'; 
import BackButton from '@components/BackButton.vue';
import { useRoute } from 'vue-router';
import Toaster from '@lib/ui/toast/Toaster.vue'

const layoutType :string = 'bookingPage';
const title :string = 'Book Your Car';
const buttonLabel :string = 'Book';
const route = useRoute();
const pageTitle = ref(route.meta.title as string || '');

const emit = defineEmits(['close']);

watch(() => route.meta.title, (newTitle) => {
  pageTitle.value = newTitle as string || '';
});

</script>

<template>
    <div class="parent-overlay">
        <div class="overlay"></div>
        <div class="content">
            <nav class="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-5 gap-2">
                <ul class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-5">
                    <li class="py-2">
                        <router-link to="/" class="nav-link">
                            Home
                        </router-link>
                    </li>
                    <li class="py-2">
                        <router-link to="/login" class="nav-link">
                            Login
                        </router-link>
                    </li>
                </ul>
            </nav>
            <div class="flex items-center justify-center">
                <div class="w-full p-6 space-y-6">
                    <Card height="85vh" :title="title">
                        <div v-if="pageTitle !== 'UserBooking'" class="flex justify-start">
                            <BackButton class="me-2 mb-2"/>
                        </div>
                        <div class="space-y-4 text-start">
                            <router-view></router-view>
                        </div>
                    </Card>
                    <Toaster />
                </div>
            </div>
        </div>
    </div>
  <!-- </Layout> -->
</template>

<style>
*{
    /* color: white; */
}
.parent-overlay {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('@images/car-rental-bg-beach.jpg') no-repeat center center/cover;
    overflow: hidden;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1;
}

.content {
    position: relative;
    z-index: 2;
    /* color: white; */
    text-align: center;
    padding: 20px;
    max-height: calc(100vh); /* Ensure that the content section doesn't overflow */
  overflow-y: auto; /* Allow scrolling for child content */
}

.nav-link {
    font-weight: 600;
    padding: 10px 20px;
    color: black;
    text-decoration: none;
    background: transparent;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
    background-color: #14b8a6;
    color: white;
}

@media (max-width: 640px) {
    .parent-overlay {
        height: 100vh; 
    }

    .content {
        padding: 10px;
    }

    .nav-link {
        font-size: 14px;
    }
}
</style>
