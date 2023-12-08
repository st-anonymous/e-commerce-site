import { useRecoilValue } from "recoil";
import Header from "./components/Header";
import ItemsContainer from "./components/ItemsContainer";
import Login from "./components/Login";
import AuthData from "./data/AuthData";
import Admin from "./components/Admin";

const App = () => {
  const authData = useRecoilValue(AuthData);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      {authData.loggedIn ? (
        authData.loginType === "user" ? (
          <ItemsContainer /> // loggedIn user
        ) : (
          <Admin /> // loggedIn admin
        )
      ) : (
        <Login /> // if user/admin is not loggedIn
      )}
    </div>
  );
};

export default App;
