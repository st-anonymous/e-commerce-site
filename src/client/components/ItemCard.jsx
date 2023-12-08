import axios from "axios";
import React, { useState } from "react";
import UserData from "../data/UserData";
import AuthData from "../data/AuthData";
import { useRecoilState, useRecoilValue } from "recoil";
import HOST from "./../data/APIConfig";

const ItemCard = (props) => {
  const {
    item_id,
    item_name,
    item_description,
    item_price,
    item_count,
  } = props;
  const [itemCount, setItemCount] = useState(item_count ? item_count : 0);
  const [userData, setUserData] = useRecoilState(UserData);
  const authData = useRecoilValue(AuthData);

  const AddToCartHandler = async () => {
    const body = { user_id: userData.user_id, item_id, item_count: itemCount };
    let user;
    if (userData.cart.length) {
      user = await axios.put(`${HOST}/users/update_cart`, body);
    } else {
      user = await axios.post(`${HOST}/users/create_cart`, body);
    }
    setUserData(user.data.data);
    setItemCount(0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.itemContainer}>
        <div style={{ paddingLeft: 20, fontSize: 36 }}>{item_name}</div>
        <div style={{ paddingLeft: 20, fontSize: 24 }}>{item_description}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ fontSize: 18, paddingLeft: 20 }}
          >{`₹ ${item_price}`}</div>
          {item_count && (
            <div
              style={{ fontSize: 18, paddingLeft: 20 }}
            >{`quantity: ${item_count}`}</div>
          )}
          {item_count && (
            <div style={{ fontSize: 18, paddingLeft: 20 }}>{`total: ${
              item_count * item_price
            }`}</div>
          )}
        </div>
      </div>
      {authData.showCart ? null : (
        <div style={styles.buttonContainer}>
          <div>
            <button
              onClick={() =>
                setItemCount((prev) => {
                  return prev ? parseInt(prev) - 1 : 0;
                })
              }
              style={styles.button}
            >
              -
            </button>
            <input
              type="number"
              min={0}
              value={parseInt(itemCount)}
              style={{ ...styles.button, width: 100, cursor: "text" }}
              placeholder="quantity"
              disabled={true}
            ></input>
            <button
              onClick={() =>
                setItemCount((prev) => {
                  return prev ? parseInt(prev) + 1 : 1;
                })
              }
              style={styles.button}
            >
              +
            </button>
          </div>
          <button
            onClick={AddToCartHandler}
            disabled={!itemCount}
            style={{
              ...styles.button,
              backgroundColor: itemCount ? "#25c379" : "",
            }}
          >
            {"add to cart"}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "200px",
    width: "350px",
    maxWidth: "95vw",
    border: "0.5px solid grey",
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "95%",
    height: "50%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "95%",
    height: "20%",
    margin: 6,
  },
  button: {
    border: "solid grey",
    borderRadius: 5,
    fontSize: 16,
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default React.memo(ItemCard);
