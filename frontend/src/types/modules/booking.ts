export interface Booking {
    booking: string;
    customer: string;
    vehicle: string;
    discount_id: string;
    booking_date: Date;
    pickup_date: Date;
    return_date: Date;
    pickup_location: string;
    return_location: string;
    status: string;
    total_price: number;
}