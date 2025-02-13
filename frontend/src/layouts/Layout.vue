<script setup lang="ts">
import ArrowLeftPipeIcon from '@icons/ArrowLeftPipeIcon.vue';
import { onMounted, ref } from 'vue';
import Toaster from '@lib/ui/toast/Toaster.vue';
import Tabs from '@components/Tabs.vue';
import Card from '@components/Card.vue';
import TextInput from '@components/TextInput.vue';
import Button from '@components/Button.vue';
import { useRouter } from 'vue-router';
import { useToast } from '@lib/ui/toast/use-toast';
import { useAuthStore } from '@store/auth';

defineProps({
    layoutType: String,
});

onMounted(() => {
    if (typeof document !== 'undefined') {
        const textElement = document.querySelector('.animated-text');
        if (textElement) {
            textElement.classList.add('fade-in');
        }
    }
});

const authStore = useAuthStore();

const inputValue = ref({
    'email': '',
    'password': '',
});

async function handleLogin() :Promise<boolean>{
    try {
        // const result :Promise<any> = await userStore.login(user);
        const result = await authStore.login(inputValue.value);
        if (result) {
            toast({
                title: 'Login successful',
                description: 'Thank you',
                variant: 'default',
            });
            console.log('Login successful:', result);
            router.push({ name: 'ProfilePage' });
        } else {
            toast({
                title: 'Login failed',
                description: 'Please try again later',
                variant: 'destructive',
            });
            console.error("Login failed:", error);
        }
    } catch (error) {
        toast({
            title: 'Login failed',
            description: 'Please try again later',
            variant: 'destructive',
        });
        console.error("Login failed:", error);
    }
}

const { toast } = useToast();
const router = useRouter();

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
            <div 
                v-if="layoutType == 'homePage'" 
                class="home-container pt-80 text-white flex flex-col items-center"
            >
                <div class="max-w-screen-lg text-center px-4">
                    <h1 class="font-bold text-3xl sm:text-3xl md:text-3xl lg:text-3xl leading-tight">
                    Hello, Welcome to <span class="text-blue-600">Car Rental</span> System
                    </h1>
                    <router-link 
                    to="/booking" 
                    class="flex gap-2 justify-center items-center mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                    tag="button"
                    >
                    <span>Booking Now!</span>
                    <ArrowLeftPipeIcon class="mt-1"/>
                    </router-link>
                </div>
            </div>
            <div v-else-if="layoutType == 'bookingPage'" class="home-container pt-80 text-white">
                
            </div>
            <div v-else-if="layoutType == 'loginPage'" class="home-container text-white">
                <!-- <h1 class="font-bold text-4xl"><span class="text-blue-600">Login</span> Page</h1> -->
                <div style="width: 50vw;" class="mx-auto flex flex-col items-center justify-center h-screen">
                    <Card
                        height="30vh"
                        width="100%"
                        class="bg-teal-50 border border-teal-200 shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out cursor-pointer"
                    >
                        <div class="flex items-center p-4 mb-4" style="height: 100%;">
                            <h1 class="font-bold text-2xl text-blue-600 mx-auto">Login</h1>
                        </div>
                        <div class="space-y-4 text-start">
                            <form @submit.prevent="handleLogin">
                                <div class="mx-auto" style="width: 50vh;">
                                    <TextInput
                                        labelName="Email"
                                        v-model="inputValue.email"
                                        type="text"
                                        class="pb-4"
                                    />
                                </div>
                                <div class="mx-auto" style="width: 50vh;">
                                    <TextInput
                                        labelName="Password"
                                        v-model="inputValue.password"
                                        type="password"
                                        class="pb-4"
                                    />
                                </div>
                                <div class="flex justify-center">
                                    <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>

            </div>
            <Toaster />
        </div>
    </div>
</template>

<style>
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
    color: white;
    text-align: center;
    padding: 20px;
}

.nav-link {
    font-weight: 600;
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    background: transparent;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
    background-color: #14b8a6;
    color: white;
}

/* Animation styles */
.animated-text {
    opacity: 0;
    transform: translateY(20px);
}

.animated-text span {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
}

.welcome-text {
    animation: fadeInUp 0.8s ease forwards 0.5s;
}

.car-rental-text {
    animation: fadeInUp 0.8s ease forwards 1s;
}

.system-text {
    animation: fadeInUp 0.8s ease forwards 1.5s;
}

.booking-button {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards 2s;
    padding: 12px 24px;
    background-color: #14b8a6;
    color: white;
    transition: transform 0.3s, background-color 0.3s;
}

.booking-button:hover {
    transform: translateY(-2px);
    background-color: #0d9488;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
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

    .animated-text {
        font-size: 1.8rem;
    }
}
</style>
