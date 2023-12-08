import axios from "axios";
import React, { useState } from "react";
import UserData from "../data/UserData";
import { useRecoilState } from "recoil";
import HOST from "./../data/APIConfig";

const ItemCard = (props) => {
  const { item_id, item_name, item_description, item_price } = props;
  const [itemCount, setItemCount] = useState("");
  const [userData, setUserData] = useRecoilState(UserData);

  const AddToCartHandler = async () => {
    const body = { user_id: userData.user_id, item_id, item_count: itemCount };
    let user;
    if (userData.cart.length) {
      user = await axios.put(`${HOST}/users/update_cart`, body);
    } else {
      user = await axios.post(`${HOST}/users/create_cart`, body);
    }
    setUserData(user.data.data);
    setItemCount("");
  };
  return (
    <div style={styles.container}>
      <div style={styles.itemContainer}>
        <div style={{ paddingLeft: 20, fontSize: 36 }}>{item_name}</div>
        <div style={{ paddingLeft: 20, fontSize: 24 }}>{item_description}</div>
        <div style={{ paddingLeft: 20, fontSize: 20 }}>{`₹ ${item_price}`}</div>
      </div>
      <div style={styles.buttonContainer}>
        <div>
          <input
            type="number"
            min={0}
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
            style={{ ...styles.button, width: 150, cursor: "text" }}
            placeholder="enter quantity"
          ></input>
        </div>
        <button
          onClick={AddToCartHandler}
          disabled={!itemCount}
          style={{
            ...styles.button,
            backgroundColor: itemCount ? "#25c379" : "",
          }}
        >
          add to cart
        </button>
      </div>
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
