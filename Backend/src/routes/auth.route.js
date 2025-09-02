import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { portectRoute } from "../middlewere/auth.middle.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.patch("/updateProfile", portectRoute, updateProfile);

export default router;
