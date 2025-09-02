import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const portectRoute = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ messege: "unauthorised -- not token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ messege: "unauthorised -- invalid token" });
    }

    const user = await User.findById(decoded.User.Id).select("-password");

    if (!user) {
      return res.status(404).json({ messege: "user not found" });
    }

    res.user = user;
    next();
  } catch (err) {}
};
