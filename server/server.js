import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

(function () {
  const PORT = 8080;

  // Run the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
