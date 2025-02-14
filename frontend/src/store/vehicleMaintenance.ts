import { defineStore } from "pinia";
import { VehicleMaintenance } from "@types/modules/vehicleMaintenance";
import { maintenanceService } from '../services/api'

export const useVehicleMaintenanceStore = defineStore('vehicleMaintenance', {
    state: () => ({
        vehicleMaintenances: [] as VehicleMaintenance[] | null, 
        loading: false,
        error: null as string | null
    }),
    getters: {
        getVehicleMaintenances(state): VehicleMaintenance[] {
            return state.vehicleMaintenances;
        },
    },
    actions: {
        async fetchVehicleMaintenances() {
            // this.loading = true;
            this.error = null;
            try {
                const response = await maintenanceService.getMaintenanceRecords();
                this.vehicleMaintenances = response.data;
            } catch (error) {
                this.error = "Failed to fetch maintenance records";
                throw new Error(`Get maintenance records failed with status: ${error}`);
            }
        },
        async createVehicleMaintenance(data) {
            try {
                const vehicleMaintenanceData = { ...data, created_by: "admin", updated_by: "admin" };
                const response = await maintenanceService.createMaintenanceRecord(vehicleMaintenanceData);
            } catch (error) {
                console.error("Failed to create maintenance record:", error);
                this.error = "Error creating maintenance record";
                throw new Error(`Create maintenance record failed with error: ${error}`);
            }
        },
        async updateVehicleMaintenance(id, updatedData) {
            try {
                const response = await maintenanceService.updateMaintenanceRecord(id, updatedData);
                if(response.status === 200){
                    const index = this.vehicleMaintenances.findIndex(vehicleMaintenance => vehicleMaintenance.maintenance_id === id);
                    if (index !== -1) {
                        this.vehicleMaintenances[index] = response.data; // Update local store
                    }
                }
            } catch (error) {
                console.error("Failed to update maintenance record:", error);
                this.error = "Error updating maintenance record";
                throw new Error(`Update failed with error: ${error}`);
            }
        },
        async deleteVehicleMaintenance(id) {
            try {
                const response = await maintenanceService.deleteMaintenanceRecord(id);
        
                if (response.status === 200 || response.status === 204) {
                    // Remove the deleted vehicle from the local store
                    this.vehicleMaintenances = this.vehicleMaintenances.filter(vehicleMaintenance => vehicleMaintenance.maintenance_id !== id);
                } else {
                    console.error("Failed to delete maintenance record:");
                    throw new Error(`Delete failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to delete maintenance record:", error);
                this.error = error.response?.data?.message || "Error deleting maintenance record";
                throw new Error(`Delete failed with error: ${error}`);
            }
        }        
    }
})