import axios from "axios";
import HOST from "../data/APIConfig";
import { useState } from "react";

const Admin = () => {
  const [totalItemsPurchased, setTotalItemsPurchased] = useState(null);
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [redeemedCouponCodes, setRedeemedCouponCodes] = useState([]);
  const GetStatsHandler = async () => {
    const admin_id = "admin_st",
      admin_pass = "super_admin";
    const stats = await axios.get(`${HOST}/admin/stats`, {
      headers: { admin_id, admin_pass },
    });
    const {
      count_of_items_purchased,
      total_purchase_amount,
      redeemed_coupon_codes,
      total_discount_amount,
    } = stats.data.data;
    setTotalItemsPurchased(count_of_items_purchased);
    setTotalPurchaseAmount(total_purchase_amount);
    setTotalDiscountAmount(total_discount_amount);
    setRedeemedCouponCodes(redeemed_coupon_codes);
  };
  return (
    <>
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
        {/* <button style={{ padding: 10, borderRadius: 15, margin: 10 }}>
          Generate Coupon Code
        </button> */}
        <button
          onClick={GetStatsHandler}
          style={{ padding: 10, borderRadius: 15, margin: 10 }}
        >
          Get Stats
        </button>
      </div>
      {totalItemsPurchased !== null && (
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
          <div>{`Total Items Purchased: ${totalItemsPurchased}`}</div>
          <div>{`Total Purchase Amount: ${totalPurchaseAmount}`}</div>
          <div>{`Total Discount Amount: ${totalDiscountAmount}`}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Redeemed Coupon Codes:</div>
            {redeemedCouponCodes.map((code) => {
              return <div key={code}>{code}</div>;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
