import axios from "axios";
import {
  add_user,
  find_user_by_id,
  find_user_by_phone,
  update_user_details,
} from "../db/schema_users";
import { create_id } from "../utils/create_id";
import admin_auth from "../db/admin_auth";
import { find_item_by_id } from "../db/schema_items";
import {
  add_new_order,
  calculate_cart_discount,
  find_order_by_id,
  update_order_details,
} from "../db/schema_orders";

export const login = (req, res) => {
  // for login phone number is required...
  const { phone } = req.body;
  try {
    // check if any user with the phone number exists...
    let user = find_user_by_phone(phone);
    // if no user is found, create a new user...
    if (!user) {
      let user_id;
      // let's generate a unique user_id that's not available already...
      while (true) {
        user_id = create_id("uid", 9);
        if (!find_user_by_id(user_id)) break;
      }
      user = add_user(user_id, phone);
    }
    // returns the user data...
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
};

export const create_cart = async (req, res) => {
  const { user_id, item_id, item_count } = req.body;
  try {
    // check if any user with the user_id exists...
    let user = find_user_by_id(user_id);
    if (!user) {
      res.status(404).json({ message: "no such user found" });
      return;
    }
    // check if cart exists already...
    if (user.cart.length > 0) {
      res.status(400).json({
        message: "cart already exists for the user, please update cart...",
        data: user,
      });
      return;
    }
    // negative item_count can't be added at the first time...
    if (item_count <= 0) {
      res.status(400).json({
        data: user,
        message: `can't remove items that is not available`,
      });
      return;
    }
    // let's add the item, as it is the 1st time item is added to cart...
    const item = find_item_by_id(item_id);
    if (!item) {
      res.status(404).json({ message: "no such item found" });
      return;
    }
    user.cart.push({ ...item, item_count });

    // let's try to generate coupon...
    const admin_id = admin_auth.admin_id;
    const admin_pass = admin_auth.admin_pass;
    const headers = { admin_id, admin_pass };
    const generate_coupon = await axios.post(
      "http://localhost:8080/admin/generate_coupon",
      { user_id },
      { headers }
    );
    user = generate_coupon.data;

    // update users...
    user = update_user_details(user_id, { ...user.data });

    // returns the user data...
    res.status(200).json({ ...user, message: "cart created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
};

export const update_cart = (req, res) => {
  const { user_id, item_id, item_count } = req.body;
  try {
    // check if any user with the user_id exists...
    let user = find_user_by_id(user_id);
    if (!user) {
      res.status(404).json({ message: "no such user found" });
      return;
    }
    // check if cart exists already...
    if (user.cart.length === 0) {
      res.status(400).json({
        message: "cart empty for the user, please create cart...",
        data: user,
      });
      return;
    }
    // let's check if item is already in the cart. If it's already in cart just change the counter else add the item.
    let user_cart = [];
    let item_found;
    user.cart.forEach((item) => {
      if (item.item_id === item_id) {
        item_found = item;
      } else {
        user_cart.push(item);
      }
    });
    if (!item_found) {
      // new item with negative count can't be added...
      if (item_count <= 0) {
        res.status(400).json({
          data: user,
          message: `can't remove items that is not available`,
        });
        return;
      }
      const item = find_item_by_id(item_id);
      user_cart.push({ ...item, item_count });
    } else {
      const curr_item_count = item_found.item_count;
      const new_item_count = curr_item_count + item_count;
      if (new_item_count < 0) {
        user_cart.push(item_found);
        res.status(400).json({
          data: user,
          message: `can't remove more items than available`,
        });
        return;
      } else if (new_item_count === 0) {
        // not include anything in user_cart... it will simply remove the item from cart...
      } else {
        user_cart.push({ ...item_found, item_count: new_item_count });
      }
    }

    // update users...
    user = update_user_details(user_id, { cart: user_cart });

    // returns the user data...
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
};

export const checkout = (req, res) => {
  const { user_id, applied_coupon_code } = req.body;
  try {
    // check if any user with the user_id exists...
    let user = find_user_by_id(user_id);
    if (!user) {
      res.status(404).json({ message: "no such user found" });
      return;
    }
    const { available_coupon_code, total_orders, cart } = user;
    // check if cart is empty...
    if (!cart.length) {
      res
        .status(404)
        .json({ message: "no items in the cart available for checkoout" });
      return;
    }

    // if coupon code is applied and it's not same as available one then let the user know it's invalid...
    if (applied_coupon_code && available_coupon_code !== applied_coupon_code) {
      res.status(404).json({ message: "invalid coupon code" });
      return;
    }
    // let's calculate the total amount, discount and items...
    let total_cart_amount = 0,
      total_cart_items = 0,
      discount_amount = 0,
      total_order_amount = 0;
    cart.forEach((item) => {
      total_cart_items += item.item_count;
      total_cart_amount += item.item_count * item.item_price;
    });
    total_order_amount = total_cart_amount;
    if (applied_coupon_code) {
      discount_amount = calculate_cart_discount(total_cart_amount);
      total_order_amount -= discount_amount;
    }
    // create a unique order_id
    let order_id;
    while (true) {
      order_id = create_id("oid", 12);
      if (!find_order_by_id(order_id)) break;
    }
    const new_order = {
      order_id,
      order_time: new Date(),
      user_id,
      total_cart_amount,
      applied_coupon_code,
      discount_amount,
      total_order_amount,
    };
    add_new_order(new_order);
    update_order_details(
      total_cart_items,
      total_order_amount,
      discount_amount,
      applied_coupon_code
    );
    user = update_user_details(user_id, {
      available_coupon_code: applied_coupon_code ? null : available_coupon_code,
      total_orders: total_orders + 1,
      cart: [],
    });
    res.status(200).json({ data: new_order, message: "order successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
};
