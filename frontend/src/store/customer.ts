import { defineStore } from "pinia";
import { Customer } from "@types/modules/customer";
import { customerService } from '../services/api'

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customers: [] as Customer[] | null, 
        loading: false,
        error: null as string | null
    }),
    getters: {
        getCustomers(state): Customer[] {
            return state.customers;
        },
    },
    actions: {
        async fetchCustomers() {
            // this.loading = true;
            this.error = null;
            try {
                const response = await customerService.getCustomers();
                this.customers = response.data;
            } catch (error) {
                this.error = "Failed to fetch customers";
                throw new Error(`Get customers failed with status: ${error}`);
            }
        },
        async createCustomer(data) {
            try {
                const customerData = { ...data, created_by: "admin", updated_by: "admin" };
                const response = await customerService.createCustomer(customerData);
            } catch (error) {
                console.error("Failed to create customer:", error);
                this.error = "Error creating customer";
                throw new Error(`Create customer failed with error: ${error}`);
            }
        },
        async updateCustomer(id, updatedData) {
            try {
                const response = await customerService.updateCustomer(id, updatedData);
                if(response.status === 200){
                    const index = this.customers.findIndex(customer => customer.customer_id === id);
                    if (index !== -1) {
                        this.customers[index] = response.data; // Update local store
                    }
                }
            } catch (error) {
                console.error("Failed to customer discount:", error);
                this.error = "Error updating customer";
                throw new Error(`Update failed with error: ${error}`);
            }
        },
        async deleteCustomer(id) {
            try {
                const response = await customerService.deleteCustomer(id);
        
                if (response.status === 200 || response.status === 204) {
                    // Remove the deleted vehicle from the local store
                    this.customers = this.customers.filter(customer => customer.customer_id !== id);
                } else {
                    console.error("Failed to delete customer:");
                    throw new Error(`Delete failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to delete customer:", error);
                this.error = error.response?.data?.message || "Error deleting customer";
                throw new Error(`Delete failed with error: ${error}`);
            }
        }        
    }
})