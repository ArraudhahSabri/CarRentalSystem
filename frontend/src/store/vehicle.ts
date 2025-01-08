import { defineStore } from "pinia";
import { Vehicle } from "@types/modules/vehicle";

export const useVehicleStore = defineStore('vehicle', {
    state: () => ({
        vehicles: [
            {
              vehicle_id: "V123456",
              make: "Toyota",
              model: "Corolla",
              year: 2020,
              vehicle_type: "Sedan",
              color: "Blue",
              plate_no: "ABC1234",
              mileage: 45000,
              current_service_date: new Date(),
              current_condition: "Good",
              status: "Inactive"
            },
            {
              vehicle_id: "V123457",
              make: "Honda",
              model: "Civic",
              year: 2018,
              vehicle_type: "Sedan",
              color: "Red",
              plate_no: "DEF5678",
              mileage: 55000,
              current_service_date: new Date(),
              current_condition: "Fair",
              status: "Active"
            },
            {
              vehicle_id: "V123458",
              make: "Ford",
              model: "Focus",
              year: 2019,
              vehicle_type: "Hatchback",
              color: "Black",
              plate_no: "GHI9012",
              mileage: 30000,
              current_service_date: new Date(),
              current_condition: "Excellent",
              status: "Active"
            },
            {
              vehicle_id: "V123459",
              make: "Chevrolet",
              model: "Malibu",
              year: 2021,
              vehicle_type: "Sedan",
              color: "White",
              plate_no: "JKL3456",
              mileage: 12000,
              current_service_date: new Date(),
              current_condition: "Good",
              status: "Active"
            },
            {
              vehicle_id: "V123460",
              make: "Hyundai",
              model: "Elantra",
              year: 2020,
              vehicle_type: "Sedan",
              color: "Silver",
              plate_no: "MNO7890",
              mileage: 42000,
              current_service_date: new Date(),
              current_condition: "Good",
              status: "Inactive"
            },
            {
              vehicle_id: "V123461",
              make: "Nissan",
              model: "Altima",
              year: 2022,
              vehicle_type: "Sedan",
              color: "Gray",
              plate_no: "PQR2345",
              mileage: 8000,
              current_service_date: new Date(),
              current_condition: "Excellent",
              status: "Active"
            },
            {
              vehicle_id: "V123462",
              make: "BMW",
              model: "3 Series",
              year: 2019,
              vehicle_type: "Sedan",
              color: "Green",
              plate_no: "STU6789",
              mileage: 37000,
              current_service_date: new Date(),
              current_condition: "Good",
              status: "Active"
            },
            {
              vehicle_id: "V123463",
              make: "Audi",
              model: "A4",
              year: 2021,
              vehicle_type: "Sedan",
              color: "Yellow",
              plate_no: "VWX1234",
              mileage: 23000,
              current_service_date: new Date(),
              current_condition: "Fair",
              status: "Inactive"
            },
            {
              vehicle_id: "V123464",
              make: "Mercedes-Benz",
              model: "C-Class",
              year: 2020,
              vehicle_type: "Coupe",
              color: "Purple",
              plate_no: "YZA5678",
              mileage: 16000,
              current_service_date: new Date(),
              current_condition: "Good",
              status: "Active"
            },
            {
              vehicle_id: "V123465",
              make: "Kia",
              model: "Optima",
              year: 2018,
              vehicle_type: "Sedan",
              color: "Orange",
              plate_no: "BCD9012",
              mileage: 45000,
              current_service_date: new Date(),
              current_condition: "Fair",
              status: "Inactive"
            },
            {
              vehicle_id: "V123466",
              make: "Mazda",
              model: "CX-5",
              year: 2021,
              vehicle_type: "SUV",
              color: "Brown",
              plate_no: "EFG3456",
              mileage: 20000,
              current_service_date: new Date(),
              current_condition: "Excellent",
              status: "Active"
            },
            {
              vehicle_id: "V123467",
              make: "Subaru",
              model: "Outback",
              year: 2019,
              vehicle_type: "SUV",
              color: "Pink",
              plate_no: "HIJ7890",
              mileage: 28000,
              current_service_date: new Date(),
              current_condition: "Good",
              status: "Active"
            },
            {
              vehicle_id: "V123468",
              make: "Toyota",
              model: "Camry",
              year: 2020,
              vehicle_type: "Sedan",
              color: "Blue",
              plate_no: "KLM1234",
              mileage: 35000,
              current_service_date: new Date("2023-12-20T00:00:00Z"),
              current_condition: "Good",
              status: "Active"
            },
            {
              vehicle_id: "V123469",
              make: "Chevrolet",
              model: "Equinox",
              year: 2021,
              vehicle_type: "SUV",
              color: "Gray",
              plate_no: "NOP5678",
              mileage: 15000,
              current_service_date: new Date(),
              current_condition: "Excellent",
              status: "Active"
            }
          ] as Vehicle[], 
    }),
    getters: {
        getVehicles(state): Vehicle[] {
            return state.vehicles;
        },
    },
    actions: {

    }
})