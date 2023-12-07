import express from "express";
import { login } from "./users_view";

const users_router = express.Router();

users_router.post("/login", login);

export default users_router;
