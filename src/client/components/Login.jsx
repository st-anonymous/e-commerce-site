import axios from "axios";
import { useState } from "react";
import HOST from "../data/APIConfig";
import AuthData from "./../data/AuthData";
import UserData from "./../data/UserData";
import { useSetRecoilState } from "recoil";

const Login = () => {
  const [type, setType] = useState("user");
  const [phone, setPhone] = useState("");
  const [adminId, setAdminId] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const setAuthData = useSetRecoilState(AuthData);
  const setUserData = useSetRecoilState(UserData);

  const HandleLogin = async () => {
    console.log(type, phone, adminId, adminPass);
    let responseStatus, loginType, data;
    if (type === "user") {
      let user = await axios.post(`${HOST}/users/login`, { phone });
      responseStatus = user.status;
      loginType = "user";
      data = user.data.data;
    } else {
      let admin = await axios.post(
        `${HOST}/admin/login`,
        {},
        { headers: { admin_id: adminId, admin_pass: adminPass } }
      );
      responseStatus = admin.status;
      loginType = "admin";
    }
    if (responseStatus === 200) {
      setAuthData({ loggedIn: true, loginType });
      if (loginType === "user") {
        setUserData(data);
      }
    }
  };

  return (
    <div
      style={{
        height: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      {type === "user" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <input
            style={{ padding: 10, margin: 6, width: 250 }}
            placeholder="enter mobile number"
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <input
            style={{ padding: 10, margin: 6, width: 250 }}
            placeholder="enter admin_id"
            maxLength={8}
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          ></input>
          <input
            style={{ padding: 10, margin: 6, width: 250 }}
            placeholder="enter admin_pass"
            maxLength={11}
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
          ></input>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <button
          onClick={HandleLogin}
          disabled={
            type === "user" ? (phone.length === 10 ? false : true) : false
          }
          style={{
            fontSize: 16,
            padding: "6px 10px",
            cursor: "pointer",
            margin: 10,
            width: 150,
          }}
        >
          Login
        </button>
        <button
          onClick={() => setType(type === "user" ? "admin" : "user")}
          style={{
            background: "transparent",
            fontSize: 16,
            padding: "6px 10px",
            cursor: "pointer",
            width: 150,
          }}
        >
          {type === "user" ? "login as an admin" : "login as a user"}
        </button>
      </div>
    </div>
  );
};

export default Login;
