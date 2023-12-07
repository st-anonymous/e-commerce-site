import { add_user, find_user_by_id } from "../db/schema_users";
import { create_id } from "../utils/create_id";

export const login = (req, res) => {
  // for login phone number is required...
  const { phone } = req.body;
  try {
    // check if any user with the phone number exists...
    let user = find_user_by_id(phone);
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
