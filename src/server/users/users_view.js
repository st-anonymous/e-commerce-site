import axios from "axios";
import { items } from "../db";
import {
  add_user,
  find_user_by_id,
  find_user_by_phone,
} from "../db/schema_users";
import { create_id } from "../utils/create_id";
import admin_auth from "../db/admin_auth";

export const login = (req, res) => {
  // for login phone number is required...
  const { phone } = req.body;
  try {
    // check if any user with the phone number exists...
    let user = find_user_by_phone(phone);
    // if no user is found, create a new user...
    if (!user) {
      const user_id = create_id("uid", 9);
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
    // let's add the item, as it
    const item = items.filter((item) => item.item_id === item_id);
    user.cart.push({ ...item, item_count });

    // let's try to generate coupon...
    const admin_id = admin_auth.admin_id;
    const admin_pass = admin_auth.admin_pass;
    const headers = { admin_id, admin_pass };
    user = await axios.post("localhost:8080/admin/generate_coupon", {
      headers,
    });

    // returns the user data...
    res.status(200).json({ data: user });
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
    // let's check if item is already in the cart. If it's already in cart just change the counter else add the item.
    let item_found = false;
    let user_cart = user.cart.map((item) => {
      if (item.item_id === item_id) {
        item_found = true;
        item.item_count += item_count;
      }
    });
    if (!item_found) {
      const item = items.filter((item) => item.item_id === item_id);
      user_cart.push({ ...item, item_count });
    }

    // returns the user data...
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
};
