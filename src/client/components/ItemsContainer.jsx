import ItemCard from "./ItemCard";
import database from "./../../server/db";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import AuthData from "../data/AuthData";
import UserData from "./../data/UserData";
import axios from "axios";
import HOST from "../data/APIConfig";

const ItemsContainer = () => {
  const authData = useRecoilValue(AuthData);
  const [userData, setUserData] = useRecoilState(UserData);
  const [items, setItems] = useState(database.items);
  const [cartValue, setCartValue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  const ToggleApplyCode = () => {
    if (appliedCode) {
      setAppliedCode("");
    } else {
      setAppliedCode(userData.available_coupon_code);
    }
  };

  const CheckoutHandler = async () => {
    const order = await axios.post(`${HOST}/users/checkout`, {
      user_id: userData.user_id,
      applied_coupon_code: appliedCode,
    });
    setAppliedCode("");
    setUserData(order.data.user);
  };

  useEffect(() => {
    if (authData.showCart) {
      setItems(userData.cart);
      let newCartValue = 0;
      userData.cart.forEach((item) => {
        newCartValue += item.item_price * item.item_count;
      });
      setCartValue(newCartValue);
    } else setItems(database.items);
  }, [authData.showCart, userData.cart]);

  useEffect(() => {
    if (cartValue && appliedCode) {
      setDiscount(cartValue * 0.1);
    } else {
      setDiscount(0);
    }
  }, [cartValue, appliedCode]);

  return (
    <>
      {authData.showCart ? (
        items.length ? (
          <div
            style={{
              fontSize: 54,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            Cart Items:{" "}
          </div>
        ) : (
          <div
            style={{
              fontSize: 54,
              marginTop: 20,
            }}
          >
            Your cart is Empty
          </div>
        )
      ) : null}
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
              item_count={item?.item_count}
            />
          );
        })}
      </div>
      {/* checkout functionality added */}
      {authData.showCart && userData.cart.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 350,
            backgroundColor: "white",
            padding: 20,
            margin: 20,
            borderRadius: 15,
          }}
        >
          <div style={{ padding: 10 }}>{`total cart value: ${cartValue}`}</div>
          {userData.available_coupon_code ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ padding: 10 }}>
                {userData.available_coupon_code}
              </div>
              <button
                style={{ padding: 10, borderRadius: 10, cursor: "pointer" }}
                onClick={ToggleApplyCode}
              >
                {appliedCode ? "remove" : "apply"}
              </button>
            </div>
          ) : null}
          <div style={{ padding: 10 }}>{`discount: ${discount}`}</div>
          <div style={{ padding: 10 }}>{`total order value: ${
            cartValue - discount
          }`}</div>
          <button
            style={{ padding: 10, borderRadius: 15, cursor: "pointer" }}
            disabled={!cartValue}
            onClick={CheckoutHandler}
          >
            checkout
          </button>
        </div>
      ) : null}
    </>
  );
};

export default ItemsContainer;
