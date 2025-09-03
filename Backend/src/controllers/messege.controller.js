import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSide = async (req, res) => {
  try {
    const logInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: logInUserId } }).select(
      "-password "
    );
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("error in get user for sidebar", err);
    return res
      .status(500)
      .json({ messege: "internal server error at get user for side bar" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getting message controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error at getting message controller" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error at save message:", error);
    return res
      .status(500)
      .json({ message: "Internal server error at message save" });
  }
};
