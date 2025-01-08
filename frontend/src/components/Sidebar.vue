<template>
    <div class="h-screen   bg-gray-800" id="side-bar" :class="dataOpenSideBar == true ? 'side-bar-visible' : 'side-bar-close'">
        <div class="bg-gray-700 h-[50px] flex justify-center items-center ">
            <div class="text-xl font-bold text-center flex items-center justify-center text-white h-full" v-show="dataOpenSideBar">
                APP DEV
            </div>
            <img src="https://avatars.githubusercontent.com/u/97021587?v=4" v-show="!dataOpenSideBar" class="p-1 w-8 h-8 rounded-full ring-2 ring-gray-100 dark:ring-gray-500 " alt="Avatar" />
        </div>
        <div class="flex flex-col justify-between h-[calc(100vh-3rem)] bg-gray-900">
            <div class="menu-man text-left px-2 whitespace-nowrap ">
                <div class="profile flex justify-center items-center text-center p-5 ">
                    <div class="text-center text-white p-2" v-show="dataOpenSideBar">
                        <img src="https://avatars.githubusercontent.com/u/97021587?v=4" class="p-1 w-24 h-24 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mb-4" alt="Avatar" />
                        <h5 class="text-xl font-medium leading-tight mb-2"> My Name</h5>
                        <p class="text-gray-500">Admin </p>
                    </div>
                </div>
                <div class="   py-3 rounded-sm cursor-pointer text-gray-300 hover:text-white">
                    <router-link 
                        to="/dashboard" 
                        class="px-2 flex space-x-2 hover:text-teal-700"
                        :class="{ 'text-teal-400': $route.path.startsWith('/admin/dashboard') }"
                    >
                        <!-- <span class="pi pi-microsoft" v-tooltip.right="'Dashboard'"></span>  -->
                        <span v-tooltip.right="'Dashboard'" class="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 12a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
                                <path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-6a4 4 0 1 0 0-8a4 4 0 0 0 0 8" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-show="dataOpenSideBar">Dashboard</span>
                    </router-link>
                </div>
                <div class="   py-3 rounded-md cursor-pointer  text-gray-300 hover:text-white">
                    <router-link 
                        to="/admin/profile" 
                        class="px-2 flex space-x-2 hover:text-teal-700"
                        :class="{ 'text-teal-400': $route.path.startsWith('/admin/profile') }"
                    >
                        <!-- <span class="pi pi-user " v-tooltip.right="'User'"></span>  -->
                        <span v-tooltip.right="'Profile'" class="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 12a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
                                <path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-6a4 4 0 1 0 0-8a4 4 0 0 0 0 8" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-show="dataOpenSideBar">Profile</span>
                    </router-link>
                </div>
                <div class="   py-3 rounded-md cursor-pointer  text-gray-300 hover:text-white">
                    <router-link 
                        to="/admin/customer" 
                        class="px-2 flex space-x-2 hover:text-teal-700"
                        :class="{ 'text-teal-400': $route.path.startsWith('/admin/customer') }"
                    >
                        <!-- <span class="pi pi-cart-plus " v-tooltip.right="'Product'"></span>  -->
                        <span v-tooltip.right="'Customer'" class="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 12a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
                                <path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-6a4 4 0 1 0 0-8a4 4 0 0 0 0 8" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-show="dataOpenSideBar">Customer</span>
                    </router-link>
                </div>
                <div class="  py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link 
                        to="/admin/booking" 
                        class="px-2 flex space-x-2 hover:text-teal-700"
                        :class="{ 'text-teal-400': $route.path.startsWith('/admin/booking') }"
                    >
                        <span v-tooltip.right="'Booking'" class="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 12a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
                                <path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-6a4 4 0 1 0 0-8a4 4 0 0 0 0 8" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-show="dataOpenSideBar">Booking</span>
                    </router-link>
                </div>
                <div class="  py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link 
                        to="/admin/billing" 
                        class="px-2 flex space-x-2 hover:text-teal-700"
                        :class="{ 'text-teal-400': $route.path.startsWith('/admin/billing') }"
                    >
                        <span v-tooltip.right="'Billing'" class="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 12a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
                                <path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-6a4 4 0 1 0 0-8a4 4 0 0 0 0 8" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-show="dataOpenSideBar">Billing</span>
                    </router-link>
                </div>
                <div class="  py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link 
                        to="/admin/discount" 
                        class="px-2 flex space-x-2 hover:text-teal-700"
                        :class="{ 'text-teal-400': $route.path.startsWith('/admin/discount') }"
                    >
                        <span v-tooltip.right="'Discount'" class="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 12a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
                                <path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-6a4 4 0 1 0 0-8a4 4 0 0 0 0 8" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-show="dataOpenSideBar">Discount</span>
                    </router-link>
                </div>
                <div class="  py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link 
                        to="/admin/vehicle" 
                        class="px-2 flex space-x-2 hover:text-teal-700"
                        :class="{ 'text-teal-400': $route.path.startsWith('/admin/vehicle') }"
                    >
                        <span v-tooltip.right="'Vehicle'" class="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 12a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
                                <path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-6a4 4 0 1 0 0-8a4 4 0 0 0 0 8" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-show="dataOpenSideBar">Vehicle</span>
                    </router-link>
                </div>
            </div>
            <div class="menu-man text-left px-2 justify-self-end whitespace-nowrap">
                <div class="   py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/" class="px-2 flex space-x-2">
                        <span v-tooltip.right="'Logout'" class="pt-1">
                        </span>
                        <span v-show="dataOpenSideBar">Logout</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        dataOpenSideBar: Boolean
    },
}
</script>
  
<style>
.p-tooltip-text {
    font-size: 10px !important;
}

#side-bar {
    overflow: hidden;
    transition: 300ms;
}

.side-bar-visible {
    width: 250px !important;
}

.side-bar-close {
    width: 50px !important;
}
</style>