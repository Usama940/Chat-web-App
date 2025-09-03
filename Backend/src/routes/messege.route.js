import express from "express";
import { protectRoute } from "../middlewere/auth.middle.js";
import {
  getUserForSide,
  getMessage,
  sendMessage,
} from "../controllers/messege.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUserForSide);
router.get("/:id", protectRoute, getMessage);
router.post("/send:id", protectRoute, sendMessage);

export default router;
