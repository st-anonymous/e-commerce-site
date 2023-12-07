import express from "express";
import { generate_coupon, stats } from "./admin_view";
import admin_auth from "../db/admin_auth";

const admin_router = express.Router();

// middleware to authenticate admin access
admin_router.use("*", (req, res, next) => {
  const { admin_id, admin_pass } = req.headers;
  if (
    admin_id === admin_auth.admin_id &&
    admin_pass === admin_auth.admin_pass
  ) {
    next();
  } else {
    res.status(400).json({ message: "Admin authentication failed" });
  }
});

admin_router.post("/generate_coupon", generate_coupon);
admin_router.get("/stats", stats);

export default admin_router;
