import { useRecoilValue } from "recoil";
import Header from "./components/Header";
import ItemsContainer from "./components/ItemsContainer";
import Login from "./components/Login";
import AuthData from "./data/AuthData";

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
          <ItemsContainer />
        ) : (
          <div>Admin Login</div>
        )
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
