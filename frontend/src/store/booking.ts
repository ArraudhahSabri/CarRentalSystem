import { defineStore } from "pinia";
import { Booking } from "@types/modules/booking";
import { bookingService } from '../services/api';
import { ref } from "vue";

export const useBookingStore = defineStore('booking', {
    state: () => ({
        bookings: [] as Booking[] | null, 
        // currentBooking: JSON.parse(localStorage.getItem("currentBooking") || "null") as Partial<Booking> | null, // Load from storage
        currentBooking: ref<Partial<Booking> | null>(
            JSON.parse(localStorage.getItem("currentBooking") || "null")
        ),
        loading: false,
        error: null as string | null
    }),
    getters: {
        getBookings(state): Booking[] {
            return state.bookings;
        },
        getCurrentBooking(state): Partial<Booking> {
            return state.currentBooking;
        }
    },
    actions: {
        async fetchBookings() {
            // this.loading = true;
            this.error = null;
            try {
                const response = await bookingService.getBookings();
                this.bookings = response.data;
            } catch (error) {
                this.error = "Failed to fetch bookings";
                throw new Error(`Get bookings failed with status: ${error}`);
            }
        },
        async createBooking(data) {
            try {
                const bookingData = { ...data, created_by: "customer", updated_by: "customer" };
                const response = await bookingService.createBooking(bookingData);
            } catch (error) {
                console.error("Failed to create booking:", error);
                this.error = "Error creating booking";
                throw new Error(`Create booking failed with error: ${error}`);
            }
        },
        async updateBooking(id, updatedData) {
            try {
                const response = await bookingService.updateBooking(id, updatedData);
                if(response.status === 200){
                    const index = this.bookings.findIndex(booking => booking.booking_id === id);
                    if (index !== -1) {
                        this.bookings[index] = response.data; // Update local store
                    }
                }
            } catch (error) {
                console.error("Failed to update booking:", error);
                this.error = "Error updating booking";
                throw new Error(`Update failed with error: ${error}`);
            }
        },
        async deleteBooking(id) {
            try {
                const response = await bookingService.deleteBooking(id);
        
                if (response.status === 200 || response.status === 204) {
                    // Remove the deleted vehicle from the local store
                    this.bookings = this.bookings.filter(booking => booking.booking_id !== id);
                } else {
                    console.error("Failed to delete booking:");
                    throw new Error(`Delete failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to delete booking:", error);
                this.error = error.response?.data?.message || "Error deleting booking";
                throw new Error(`Delete failed with error: ${error}`);
            }
        },        
        async setCurrentBooking(bookingData) {
            try{
                if (!this.bookings || this.bookings.length === 0) {
                    await this.fetchBookings();
                }
                // const vehicle = this.bookings.find(b => 
                //     v.make === vehicleData.make || 
                //     v.vehicle_model === vehicleData.vehicle_model ||
                //     v.plate_no === vehicleData.plate_no 
                // );
                // console.log(bookingData);
                localStorage.setItem("currentBooking", JSON.stringify(bookingData));
                this.currentBooking = bookingData;
            }catch(error){
                console.error(error)
                throw new Error(error);
            }
        }
    }
})