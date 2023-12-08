import database from "../db";
import {
  add_coupon_code,
  find_coupon_code,
  update_coupon_code,
} from "../db/schema_coupon_codes";
import { find_user_by_id, update_user_details } from "../db/schema_users";
import { create_id } from "../utils/create_id";

export const admin_login = (req, res) => {
  res.status(200).json({ message: "logged in as admin" });
};
export const generate_coupon = (req, res) => {
  const { user_id } = req.body;
  try {
    const user = find_user_by_id(user_id);
    if (!user) {
      res
        .status(404)
        .json({ message: `no user found with this user_id: ${user_id}` });
      return;
    }

    const {
      available_coupon_code,
      next_coupon_code_avail_on,
      total_orders,
      cart,
    } = user;

    let new_available_coupon_code = null;
    let new_next_coupon_code_avail_on = next_coupon_code_avail_on;

    // check the order number.
    const order_number = total_orders + (cart.length ? 1 : 0);

    //check if he's available for a new new_available_coupon_code or not...
    if (order_number < new_next_coupon_code_avail_on)
      new_available_coupon_code = available_coupon_code;
    else {
      // expire the old coupon code before generating a new one...
      if (available_coupon_code) {
        update_coupon_code(available_coupon_code, {
          coupon_code_status: "expired",
        });
      }
      // let's generate a unique coupon code that's not available already...
      while (true) {
        new_available_coupon_code = create_id("", 12);
        if (!find_coupon_code(new_available_coupon_code)) break;
      }
      // add the new coupon code to the coupon_codes_schema
      add_coupon_code(new_available_coupon_code, user_id);
      new_next_coupon_code_avail_on += database.n;
    }
    const new_user_details = update_user_details(user_id, {
      available_coupon_code: new_available_coupon_code,
      next_coupon_code_avail_on: new_next_coupon_code_avail_on, // increase the next_coupon_code_avail_on value by n days;
    });
    res.status(200).json({
      message: new_available_coupon_code
        ? "new_available_coupon_code successfully generated"
        : "not eligible for coupon code",
      data: new_user_details,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
};
export const stats = (req, res) => {
  const {
    count_of_items_purchased,
    total_purchase_amount,
    redeemed_coupon_codes,
    total_discount_amount,
  } = database;
  res.status(200).json({
    data: {
      count_of_items_purchased,
      total_purchase_amount,
      redeemed_coupon_codes,
      total_discount_amount,
    },
  });
};
export const all_coupons = (req, res) => {
  const { coupon_codes } = database;
  res.status(200).json({ data: coupon_codes });
};
