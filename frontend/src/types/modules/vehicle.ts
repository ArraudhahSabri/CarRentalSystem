export interface Vehicle {
    vehicle_id: string;
    make: string;
    vehicle_model: string;
    model_year: number;
    vehicle_type: string;
    color: string;
    plate_number: string;
    mileage: number;
    current_service_date: Date;
    current_condition: string;
    status: string | number;
}

export interface VehicleTest {
    brand: string;
    model: string;
    status: string;
}