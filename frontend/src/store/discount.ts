import { defineStore } from "pinia";
import { Discount } from "@types/modules/discount";
import { discountService } from '../services/api'

export const useDiscountStore = defineStore('discount', {
    state: () => ({
        discounts: [] as Discount[] | null, 
        loading: false,
        error: null as string | null
    }),
    getters: {
        getDiscounts(state): Discount[] {
            return state.discounts;
        },
    },
    actions: {
        async fetchDiscounts() {
            // this.loading = true;
            this.error = null;
            try {
                const response = await discountService.getDiscounts();
                this.discounts = response.data;
            } catch (error) {
                this.error = "Failed to fetch discounts";
                throw new Error(`Get discounts failed with status: ${error}`);
            }
        },
        async createDiscount(data) {
            try {
                const discountData = { ...data, created_by: "admin", updated_by: "admin" };
                const response = await discountService.createDiscount(discountData);
            } catch (error) {
                console.error("Failed to create discount:", error);
                this.error = "Error creating discount";
                throw new Error(`Create discount failed with error: ${error}`);
            }
        },
        async updateDiscount(id, updatedData) {
            try {
                const response = await discountService.updateDiscount(id, updatedData);
                if(response.status === 200){
                    const index = this.discounts.findIndex(discount => discount.discount_id === id);
                    if (index !== -1) {
                        this.discounts[index] = response.data; // Update local store
                    }
                }
            } catch (error) {
                console.error("Failed to update discount:", error);
                this.error = "Error updating discount";
                throw new Error(`Update failed with error: ${error}`);
            }
        },
        async deleteDiscount(id) {
            try {
                const response = await discountService.deleteDiscount(id);
        
                if (response.status === 200 || response.status === 204) {
                    // Remove the deleted vehicle from the local store
                    this.discounts = this.discounts.filter(discount => discount.discount_id !== id);
                } else {
                    console.error("Failed to delete discount:");
                    throw new Error(`Delete failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to delete discount:", error);
                this.error = error.response?.data?.message || "Error deleting discount";
                throw new Error(`Delete failed with error: ${error}`);
            }
        }        
    }
})