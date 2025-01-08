<script setup lang="ts">
import Layout from '@layouts/auth/Layout.vue';

import { ref, watch } from 'vue';
import { useStaffProfileStore } from '@store/staff';
import Card from '@components/Card.vue'; 
import { Staff } from '@types/modules/staff';
import EditProfileIcon from '@icons/EditProfileIcon.vue';
import { useRoute } from 'vue-router';
import BackButton from '@components/BackButton.vue';
// import { useToast } from '@lib/ui/toast/use-toast';

const staffProfileStore = useStaffProfileStore();
const route = useRoute();
const pageTitle = ref(route.meta.title as string || '');
const staffProfile = ref<Staff>(staffProfileStore.getStaffProfile);
// const { toast } = useToast();

watch(() => route.meta.title, (newTitle) => {
  pageTitle.value = newTitle as string || '';
});
</script>

<template>
  <Layout>
    <template #content>
      <div style="margin-top: 2rem;"></div>
      <div class="mx-auto px-4 mb-8">
        <Card>
          <div class="container">
            <div v-if="pageTitle !== 'Edit Profile'" class="flex justify-end">
              <router-link class="flex justify-between hover:text-teal-500" :to="{ name: 'ProfileEditPage' }">
                <EditProfileIcon class="me-2"/>
                <span> Edit Profile</span>
              </router-link>
            </div>
            <div v-else class="flex justify-start">
              <BackButton class="me-2"/>
            </div>
            <div class="flex justify-center items-center pt-8 mb-2">
              <img src="https://avatars.githubusercontent.com/u/97021587?v=4" class="p-1 w-28 h-28 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mb-4" alt="Avatar" />
            </div>
            <div class="text-center mb-4">
              <span class="mb-2 block text-slate-400">{{ staffProfile.first_name }} {{ staffProfile.last_name }}</span>
              <span class="block text-slate-400">Admin</span>
            </div>
            <hr>
            <router-view></router-view>
          </div>
        </Card>
      </div>
    </template>
  </Layout>
</template>
