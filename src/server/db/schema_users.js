import database from ".";

// find user from users by phone, returns null if not found. (useful during login)
export const find_user_by_phone = (phone) => {
  const user = database.users.filter((user) => user.phone === phone)[0];
  console.log(user);
  return user;
};

// find user from users by user_id, returns null if not found.
export const find_user_by_id = (user_id) => {
  const user = database.users.filter((user) => user.user_id === user_id)[0];
  return user;
};

// update user in users with the new changed value, returns the new user value, returns null if not found any such user...
export const update_user_details = (user_id, updated_details) => {
  let new_user_details = null;
  const new_users = database.users.map((item) => {
    if (item.user_id === user_id) {
      return (new_user_details = { ...item, ...updated_details });
    }
  });
  db.users = new_users;
  return new_user_details;
};

// used to add a new user to users schema...
export const add_user = (user_id, phone) => {
  const new_user_details = {
    user_id,
    phone,
    available_coupon_code: null,
    next_coupon_code_avail_on: n,
    total_orders: 0,
    cart: [],
  };
  database.users.push(new_user_details);
  return new_user_details;
};
