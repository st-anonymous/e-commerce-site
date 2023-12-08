import database from ".";

// used to update a coupon code status...
// returns updated coupon code... If no such coupon code found returns null...
export const update_coupon_code = (coupon_code, updated_details) => {
  let new_coupon_code_details = null;
  const new_coupon_codes = database.coupon_codes.map((item) => {
    if (item.coupon_code === coupon_code) {
      return (new_coupon_code_details = { ...item, ...updated_details });
    } else {
      return item;
    }
  });
  database.coupon_codes = new_coupon_codes;
  return new_coupon_code_details;
};

// used to add a coupon code...
// returns new coupon code...
export const add_coupon_code = (coupon_code, user_id) => {
  const new_coupon_code_details = {
    coupon_code,
    user_id,
    coupon_code_status: "available",
  };
  database.coupon_codes.push(new_coupon_code_details);
  return new_coupon_code_details;
};

// used to find a coupon code details...
// returns coupon code details... If no such coupon code found returns null...
export const find_coupon_code = (coupon_code) => {
  database.coupon_codes.forEach((item) => {
    if (item.coupon_code === coupon_code) {
      return item;
    }
  });
  return null;
};
