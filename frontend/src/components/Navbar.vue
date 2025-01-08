<script>
import HomeIcon from '@icons/HomeIcon.vue';

  export default {
    props: {
      dataOpenSideBar: Boolean,
      clickHambuger: Function,
      isAuth: Boolean
    },
    data() {
      return {
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-refresh',
            command: () => {
              this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
            }
          },
          {
            label: 'Change Password',
            icon: 'pi pi-times',
            command: () => {
              this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            }
          },
        ]
      }
    },
    methods: {
      toggle(event) {
        this.$refs.menu.toggle(event);
      },
    },
    components: {
      HomeIcon
    }
  }
</script>

<template>
  <div class="w-full bg-gray-100">
      <div class="flex justify-between items-center h-[50px]">
          <div v-if="isAuth" class="px-4 cursor-pointer hover:bg-teal-100 py-4" @click="clickHambuger">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-6 h-6"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
          </div>
          <div class="p-4" v-else>
            <HomeIcon/>
          </div>
          <div v-if="!isAuth" class="py-2">
              <!-- <InputText type="text" v-model="value" class="h-[40px]" placeholder="Search.." /> -->
              text input here maybe
          </div>
          <div class="flex space-x-3 items-center justify-center px-3">
              <!-- <div class="text-md">
                  <router-link to="/login">Login</router-link>
              </div>
              <div class="text-md">
                <router-link to="/register">Register</router-link>
              </div> -->
              <Avatar icon="pi pi-user" class="mr-2" style="background-color:#9c27b0; color: #ffffff" shape="circle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
              <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
          </div>
      </div>
  </div>
</template>