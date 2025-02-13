import { defineStore } from "pinia";
import { Vehicle } from "@types/modules/vehicle";
import { vehicleService } from '../services/api'

export const useVehicleStore = defineStore('vehicle', {
    state: () => ({
        vehicles: [] as Vehicle[] | null, 
        loading: false,
        error: null as string | null
    }),
    getters: {
        getVehicles(state): Vehicle[] {
            return state.vehicles;
        },
    },
    actions: {
        async fetchVehicles() {
            // this.loading = true;
            this.error = null;
            try {
                const response = await vehicleService.getVehicles();
                this.vehicles = response.data;
            } catch (error) {
                this.error = "Failed to fetch vehicles";
                throw new Error(`Get vehicles failed with status: ${error}`);
            }
        },
        async createVehicle(data) {
            try {
                const vehicleData = { ...data, status: 1, created_by: "admin", updated_by: "admin" };
                const response = await vehicleService.createVehicle(vehicleData);
            } catch (error) {
                console.error("Failed to create vehicle:", error);
                this.error = "Error creating vehicle";
                throw new Error(`Create vehicle failed with error: ${error}`);
            }
        },
        async updateVehicle(id, updatedData) {
            try {
                const response = await vehicleService.updateVehicle(id, updatedData);
                console.log(response.status);
                if(response.status === 200){
                    const index = this.vehicles.findIndex(vehicle => vehicle.vehicle_id === id);
                    if (index !== -1) {
                        this.vehicles[index] = response.data; // Update local store
                    }
                }
            } catch (error) {
                console.error("Failed to update vehicle:", error);
                this.error = "Error updating vehicle";
                throw new Error(`Update failed with error: ${error}`);
            }
        },
        async deleteVehicle(id) {
            try {
                const response = await vehicleService.deleteVehicle(id);
        
                if (response.status === 200 || response.status === 204) {
                    // Remove the deleted vehicle from the local store
                    this.vehicles = this.vehicles.filter(vehicle => vehicle.vehicle_id !== id);
                } else {
                    console.error("Failed to delete vehicle:");
                    throw new Error(`Delete failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to delete vehicle:", error);
                this.error = error.response?.data?.message || "Error deleting vehicle";
                throw new Error(`Delete failed with error: ${error}`);
            }
        }        
    }
})