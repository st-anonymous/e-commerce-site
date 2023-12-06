import express from "express";
import cors from "cors";
import admin_router from "./admin/admin_router";
import users_router from "./users/users_router";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", admin_router);
app.use("/users", users_router);

(function () {
  const PORT = 8080;

  // Run the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
