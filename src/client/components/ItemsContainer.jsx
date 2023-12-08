import ItemCard from "./ItemCard";
import database from "./../../server/db";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import AuthData from "../data/AuthData";

const ItemsContainer = () => {
  const authData = useRecoilValue(AuthData);
  const [items, setItems] = useState(database.items);
  useEffect(() => {
    if (authData.showCart) setItems(userData.cart);
    else setItems(database.items);
  }, [authData.showCart]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "95%",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {items.map((item) => {
        return (
          <ItemCard
            key={item.item_id}
            item_id={item.item_id}
            item_name={item.item_name}
            item_description={item.item_description}
            item_price={item.item_price}
          />
        );
      })}
    </div>
  );
};

export default ItemsContainer;
