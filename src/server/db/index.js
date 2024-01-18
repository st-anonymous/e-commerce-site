const n = 5; //coupon code to be provided on nth order
const m = 3;
const off = 10; // % of offer on coupon code

let items = Array.from({ length: 24 }, (_, index) => ({
  item_id: `item${1000 + index}`,
  item_name: `Item ${index + 1}`,
  item_description: `Description for Item ${index + 1}`,
  item_price: Math.floor(Math.random() * 5000) + 100,
}));
// item_type = {
//   item_id: string;
//   item_name: string;
//   item_description: string;
//   item_price: number;
// };

let coupon_codes = [];
// coupon_code_type = {
//   coupon_code: string;
//   user_id: string;
//   coupon_code_status: "available" | "redeemed" | "expired";
// };

let users = [];
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

let orders = [];
// order_type = {
//   order_id: string;
//   order_time: Date;
//   user_id: string;
//   total_cart_amount: number;
//   applied_coupon_code: string;
//   discount_amount: number;
//   total_order_amount: number;
// };

let count_of_items_purchased = 0;
let total_purchase_amount = 0;
let redeemed_coupon_codes = [];
let total_discount_amount = 0;
let total_order_on_special_day = 0;

const database = {
  n,
  off,
  items,
  coupon_codes,
  users,
  orders,
  count_of_items_purchased,
  total_purchase_amount,
  redeemed_coupon_codes,
  total_discount_amount,
};

export default database;
