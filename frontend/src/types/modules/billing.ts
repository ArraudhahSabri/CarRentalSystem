export interface Billing {
    billing_id: string;
    booking: string;
    amount_due: number;
    payment_status: string;
    payment_method: string;
    payment_date: Date;
}