import UserData from "./../data/UserData";
import AuthData from "./../data/AuthData";
import { useRecoilValue, useRecoilState } from "recoil";

const Header = () => {
  const userData = useRecoilValue(UserData);
  const [authData, setAuthData] = useRecoilState(AuthData);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "lightgreen",
        height: "20%",
        width: "100%",
        padding: 20,
      }}
    >
      <div style={{ fontSize: 54, marginLeft: "5%" }}>my store</div>
      {authData.loggedIn && (
        <div
          style={{
            display: "flex",
            marginRight: "5%",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              padding: 10,
              position: "relative",
            }}
          >
            {authData.showCart ? (
              <button
                onClick={() =>
                  setAuthData((prev) => {
                    return { ...prev, showCart: false };
                  })
                }
                style={{
                  fontSize: 24,
                  border: "1px solid grey",
                  borderRadius: 10,
                  backgroundColor: "#25c379",
                  cursor: "pointer",
                  padding: 10,
                }}
              >
                home
              </button>
            ) : (
              authData.loginType === "user" && (
                <button
                  onClick={() =>
                    setAuthData((prev) => {
                      return { ...prev, showCart: true };
                    })
                  }
                  style={{
                    fontSize: 24,
                    border: "1px solid grey",
                    borderRadius: 10,
                    backgroundColor: "#25c379",
                    cursor: "pointer",
                    padding: 10,
                  }}
                >
                  cart
                </button>
              )
            )}
            {userData?.cart?.length && !authData.showCart ? (
              <div
                style={{
                  backgroundColor: "red",
                  height: 15,
                  width: 15,
                  borderRadius: 7.5,
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              />
            ) : null}
          </div>
          <div
            style={{
              padding: 10,
            }}
          >
            <button
              onClick={() => setAuthData({})}
              style={{
                fontSize: 24,
                border: "1px solid grey",
                borderRadius: 10,
                backgroundColor: "#25c379",
                cursor: "pointer",
                padding: 10,
              }}
            >
              logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
