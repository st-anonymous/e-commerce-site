export type item_type = {
  item_id: string;
  item_name: string;
  item_description: string;
  item_price: number;
};

export type coupon_code_type = {
  coupon_code: string;
  user_id: string;
  status: "available" | "redeemed" | "expired";
};

export type cart_item_type = {
  item_id: string;
  item_name: string;
  item_description: string;
  item_price: number;
  item_count: number;
};

export type user_type = {
  user_id: string;
  user_name: string;
  available_coupon_code: string;
  next_coupon_code_avail_on: number;
  total_orders: number;
  cart: Array<cart_item_type>;
};

export type order_type = {
  order_id: string;
  order_time: Date;
  user_id: string;
  total_cart_amount: number;
  coupon_code: string;
  discount_amount: number;
  order_amount: number;
};
