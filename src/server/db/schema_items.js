import database from ".";

export const find_item_by_id = (item_id) => {
  const item = database.items.filter((item) => item.item_id === item_id)[0];
  return item;
};
