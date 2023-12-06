import { coupon_code_type, item_type, order_type, user_type } from "../types";

export let items: Array<item_type> = [];
export let coupon_codes: Array<coupon_code_type> = [];
export let users: Array<user_type> = [];
export let orders: Array<order_type> = [];

export let count_of_items_purchased: number = 0;
export let total_purchase_amount: number = 0;
export let redeemed_coupon_codes: Array<string> = [];
export let total_discount_amount: number = 0;
