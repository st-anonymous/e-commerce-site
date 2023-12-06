import { n } from "../db";
import {
  add_coupon_code,
  find_coupon_code,
  update_coupon_code,
} from "../db/schema_coupon_codes";
import { find_user_by_id, update_user_details } from "../db/schema_users";

export const generate_coupon = (req, res) => {
  const { user_id } = req.body;
  try {
    const user = find_user_by_id(user_id);
    if (user === null) {
      res
        .status(404)
        .json({ message: `no user found with this user_id: ${user_id}` });
    }

    const {
      available_coupon_code,
      next_coupon_code_avail_on,
      total_orders,
      cart,
    } = user;

    let coupon_code = null;

    // check the order number.
    const order_number = total_orders + cart.length ? 1 : 0;

    //check if he's available for a new coupon_code or not...
    if (order_number < next_coupon_code_avail_on)
      coupon_code = available_coupon_code;
    else {
      // expire the old coupon code before generating a new one...
      if (available_coupon_code) {
        update_coupon_code(available_coupon_code, {
          coupon_code_status: "expired",
        });
      }
      // let's generate a unique coupon code that's not available already...
      while (true) {
        coupon_code = create_id("", 12);
        if (!find_coupon_code(coupon_code)) break;
      }
      // add the new coupon code to the coupon_codes_schema
      add_coupon_code(coupon_code, user_id);
      // increase the next_coupon_code_avail_on value by n days;
      next_coupon_code_avail_on += n;
    }
    const new_user_details = update_user_details(user_id, {
      available_coupon_code: coupon_code,
      next_coupon_code_avail_on: next_coupon_code_avail_on,
    });
    res.status(200).json({
      message: "coupon_code successfully generated",
      data: new_user_details,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
};
export const stats = (req, res) => {};
