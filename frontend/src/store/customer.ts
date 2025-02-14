import { defineStore } from "pinia";
import { Customer } from "@types/modules/customer";
import { customerService } from '../services/api'

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customers: [] as Customer[] | null, 
        // currentCustomer: null as Customer | null,
        currentCustomer: JSON.parse(localStorage.getItem("currentCustomer") || "null") as Customer | null, // Load from storage
        loading: false,
        error: null as string | null
    }),
    getters: {
        getCustomers(state): Customer[] {
            return state.customers;
        },
        getCurrentCust(state): Customer {
            return state.currentCustomer;
        }
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
        },
        async getCurrentCustomer(email :string) :Promise<boolean>{
            try{
                // await this.fetchCustomers();
                if (!this.customers || this.customers.length === 0) {
                    await this.fetchCustomers();
                }
                const customer = this.customers.find(c => c.email === email);
                if (customer) {
                    localStorage.setItem("currentCustomer", JSON.stringify(customer)); // 🔥 Save to localStorage
                    this.currentCustomer = customer;
                    return true;
                } else {
                    localStorage.removeItem("currentCustomer");
                    this.currentCustomer = null;
                    return false;
                }
            }catch(error){
                console.log(`error fetch current customer : ${error}`);
                // return this.currentCust;
                return false;
            }
        }, 
        async checkOrCreateCustomer(customerData :Customer) {
            try{
                if (!this.customers || this.customers.length === 0) {
                    await this.fetchCustomers();
                }
                const customer = this.customers.find(c => 
                    c.email === customerData.email || c.phone_number === customerData.phone_number
                );
                if (customer) {
                    throw new Error(`Customer with this email or phone number already exists `);
                } else {
                    try{
                        const response = await this.createCustomer(customerData);
                        localStorage.setItem("currentCustomer", JSON.stringify(customerData)); // 🔥 Save to localStorage
                        this.currentCustomer = customerData;
                    }catch(error){
                        throw new Error(`Create customer failed`);
                    }
                }
            }catch(error){
                throw new Error(`Customer with this email or phone number already exists `);
            }
        }       
    }
})