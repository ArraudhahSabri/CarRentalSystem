<script setup lang="ts">
import Sidebar from '@components/Sidebar.vue';
import Navbar from '@components/Navbar.vue';
import { ref, watchEffect } from 'vue';
import PageHeader from '@components/PageHeader.vue';
import { useRoute } from 'vue-router';
import Toaster from '@lib/ui/toast/Toaster.vue'

const isAuth = ref<boolean>(false)
const openSidebar = ref<boolean>(true)
const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value
}
const route = useRoute();
// Define a reactive title
const pageTitle = ref(route.meta.title as string || 'Default Title');

// Watch for route changes and update the page title accordingly
watchEffect(() => {
  pageTitle.value = route.meta.title as string || 'Default Title'; // fallback to a default title
});
</script>

<template>
  <!-- <Sidebar/> -->
  <div class="w-full h-full flex">
    <Sidebar :dataOpenSideBar="openSidebar" />
    <div class="w-full h-full">
      <Navbar :dataOpenSideBar="openSidebar" :clickHambuger="toggleSidebar" :isAuth="isAuth"/>
      <div class="w-full h-[calc(100vh-50px)]">
        <!-- <div style="overflow-y: hidden;"> -->
          <Toaster />
        <!-- </div> -->
        <PageHeader
            :title="pageTitle"
        />
        <!-- <router-view></router-view> -->
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>