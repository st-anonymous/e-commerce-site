import express from "express";
import { admin_login, generate_coupon, stats, all_coupons } from "./admin_view";
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

admin_router.post("/login", admin_login);
admin_router.post("/generate_coupon", generate_coupon);
admin_router.get("/stats", stats);
admin_router.get("/all_coupons", all_coupons);

export default admin_router;
