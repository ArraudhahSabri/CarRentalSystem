import { defineStore } from "pinia";
import { Billing } from "@types/modules/billing";
import { billingService } from '../services/api'

export const useBillingStore = defineStore('billing', {
    state: () => ({
        billings: [] as Billing[] | null, 
        loading: false,
        error: null as string | null
    }),
    getters: {
        getBillings(state): Billing[] {
            return state.billings;
        },
    },
    actions: {
        async fetchBillings() {
            // this.loading = true;
            this.error = null;
            try {
                const response = await billingService.getBills();
                this.billings = response.data;
            } catch (error) {
                this.error = "Failed to fetch billings";
                throw new Error(`Get billings failed with status: ${error}`);
            }
        },
        async createBilling(data) {
            try {
                const billingData = { ...data, created_by: "customer", updated_by: "customer" };
                const response = await billingService.createBill(billingData);
            } catch (error) {
                console.error("Failed to create billing:", error);
                this.error = "Error creating billing";
                throw new Error(`Create billing failed with error: ${error}`);
            }
        },
        async updateBilling(id, updatedData) {
            try {
                const response = await billingService.updateBill(id, updatedData);
                if(response.status === 200){
                    const index = this.billings.findIndex(billing => billing.billing_id === id);
                    if (index !== -1) {
                        this.billings[index] = response.data; // Update local store
                    }
                }
            } catch (error) {
                console.error("Failed to update billing:", error);
                this.error = "Error updating billing";
                throw new Error(`Update failed with error: ${error}`);
            }
        },
        async deleteBilling(id) {
            try {
                const response = await billingService.deleteBill(id);
        
                if (response.status === 200 || response.status === 204) {
                    // Remove the deleted vehicle from the local store
                    this.billings = this.billings.filter(billing => billing.billing_id !== id);
                } else {
                    console.error("Failed to delete billing:");
                    throw new Error(`Delete failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to delete billing:", error);
                this.error = error.response?.data?.message || "Error deleting billing";
                throw new Error(`Delete failed with error: ${error}`);
            }
        }        
    }
})