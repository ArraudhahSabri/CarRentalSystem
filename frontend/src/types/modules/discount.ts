export interface Discount {
    discount_id: string;
    discount_code: string;
    valid_from: Date;
    valid_to: Date;
    discount_percentage: number;
    discount_description: string;
}