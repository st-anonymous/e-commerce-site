import database from ".";

export const calculate_cart_discount = (total_cart_amount) => {
  const cart_discount = total_cart_amount * (database.off / 100);
  return cart_discount;
};

// add new order to orders...
export const add_new_order = (new_order) => {
  database.orders.push(new_order);
};

// find order by id...
export const find_order_by_id = (order_id) => {
  const order = database.orders.filter((order) => {
    order.order_id === order_id;
  })[0];
  return order;
};

export const update_order_details = (
  total_cart_items,
  total_order_amount,
  discount_amount,
  applied_coupon_code
) => {
  database.count_of_items_purchased += total_cart_items;
  database.total_purchase_amount += total_order_amount;
  database.total_discount_amount += discount_amount;
  if (applied_coupon_code)
    database.redeemed_coupon_codes.push(applied_coupon_code);
};
