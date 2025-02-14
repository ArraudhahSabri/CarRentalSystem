export interface VehicleMaintenance {
    maintenance_id: string;
    vehicle: string;
    maintenance_date: Date;
    service_description: string;
    mileage_at_service: number;
    service_cost: number;
    next_service_mileage: number;
}