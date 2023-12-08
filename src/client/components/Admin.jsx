import axios from "axios";
import HOST from "../data/APIConfig";
import { useState } from "react";

const Admin = () => {
  const [currValue, setCurrValue] = useState("");
  const [totalItemsPurchased, setTotalItemsPurchased] = useState(null);
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [redeemedCouponCodes, setRedeemedCouponCodes] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);

  const admin_id = "admin_st",
    admin_pass = "super_admin";

  const GetAllCoupons = async () => {
    const coupons = await axios.get(`${HOST}/admin/all_coupons`, {
      headers: { admin_id, admin_pass },
    });
    setAllCoupons(coupons.data.data);
    setCurrValue("all_coupons");
  };

  const GetStatsHandler = async () => {
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
    setCurrValue("stats");
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
        <button
          onClick={GetAllCoupons}
          style={{
            padding: 10,
            borderRadius: 15,
            margin: 10,
            cursor: "pointer",
          }}
        >
          Show all Generated Coupon Codes
        </button>
        <button
          onClick={GetStatsHandler}
          style={{
            padding: 10,
            borderRadius: 15,
            margin: 10,
            cursor: "pointer",
          }}
        >
          Get Stats
        </button>
      </div>

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
        {currValue === "stats" && (
          <>
            <div>{`Total Items Purchased: ${totalItemsPurchased}`}</div>
            <div>{`Total Purchase Amount: ${totalPurchaseAmount}`}</div>
            <div>{`Total Discount Amount: ${totalDiscountAmount}`}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Redeemed Coupon Codes:</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {redeemedCouponCodes.map((code) => {
                  return <div key={code}>{code}</div>;
                })}
              </div>
            </div>
          </>
        )}
        {currValue === "all_coupons" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>All generated Coupon Codes:</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ padding: 10 }}>coupon_code</div>
                <div style={{ padding: 10 }}>user_id</div>
                <div style={{ padding: 10 }}>status</div>
              </div>
              {allCoupons.map((item) => {
                return (
                  <div
                    key={item?.coupon_code}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ padding: 10 }}>{item?.coupon_code}</div>
                    <div style={{ padding: 10 }}>{item?.user_id}</div>
                    <div style={{ padding: 10 }}>
                      {item?.coupon_code_status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
