import express from "express";
import { create_cart, login, update_cart } from "./users_view";

const users_router = express.Router();

users_router.post("/login", login);
users_router.post("/create_cart", create_cart);
users_router.put("/update_cart", update_cart);

export default users_router;
