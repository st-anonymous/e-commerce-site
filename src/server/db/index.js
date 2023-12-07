export const n = 5; //coupon code to be provided on nth order
export const off = 10; // % of offer on coupon code

export let items = [];
// item_type = {
//   item_id: string;
//   item_name: string;
//   item_description: string;
//   item_price: number;
// };

export let coupon_codes = [];
// coupon_code_type = {
//   coupon_code: string;
//   user_id: string;
//   coupon_code_status: "available" | "redeemed" | "expired";
// };

export let users = [];
// user_type = {
//   user_id: string;
//   phone: string;
//   available_coupon_code: string;
//   next_coupon_code_avail_on: number;
//   total_orders: number;
//   cart: Array<cart_item_type>;
// };

// cart_item_type = {
//   item_id: string;
//   item_name: string;
//   item_description: string;
//   item_price: number;
//   item_count: number;
// };

export let orders = [];
// order_type = {
//   order_id: string;
//   order_time: Date;
//   user_id: string;
//   total_cart_amount: number;
//   coupon_code: string;
//   discount_amount: number;
//   order_amount: number;
// };

export let count_of_items_purchased = 0;
export let total_purchase_amount = 0;
export let redeemed_coupon_codes = [];
export let total_discount_amount = 0;
