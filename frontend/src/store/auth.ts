import { defineStore } from "pinia";
import { ref } from "vue";
import { Staff } from "@types/modules/staff";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: ref<boolean>(false),
        staffProfile: {
            staff_id: "1",        
            first_name: "Mohamad Taufik", 
            last_name: "Abd Rahman",       
            email: "mohamadtaufik@taufik.com",
            password: "admin123",
            phone_no: "0112222222",
            role: "admin",
            hire_date: new Date(),
            salary: 0,
        } as Staff
    }),
    getters: {
        getIsAuth(state): boolean {
            return state.isAuthenticated;
        },
    },
    actions: {
        async login(staffProfile :Partial<Staff>){
            try {
                console.log(staffProfile);
                if(this.staffProfile.email === staffProfile.email && this.staffProfile.password === staffProfile.password) {
                    this.isAuthenticated = true;
                    return true;
                }
                return false;
            } catch (error) {
                return error;
            }
        },
    }
})