import Chat from "../model/chat.model.js"
import Message from "../model/message.model.js";

const createChatController = async (req, res) => {
  try {
    const { model } = req.body;

    if (!model) {
      return res.status(400).json({ message: "Model is required" });
    }

    // check if correct model is provided
    const validModels = ["gpt-3.5-turbo", "gpt-4"];
    if (!validModels.includes(model)) {
      return res.status(400).json({ message: "Invalid model provided" });
    }

    const savedChat = await Chat.create({
      userId: req.user._id, // Assuming the user ID is stored in req.user by the auth middleware
      model,
    });

    res.status(201).json({
      userId: savedChat.userId,
      chatId: savedChat._id,
      topic: savedChat.topic,
      model: savedChat.model,
      updatedAt: savedChat.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating chat" });
  }
};

const getRecentChatController = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is stored in req.user by the auth middleware

    const recentChats = await Chat.find({ userId })
      .select("model updatedAt") // Select only the model and updatedAt fields
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
      .limit(20); // Limit to the 20 most recent chats

    if (!recentChats) {
      return res.status(404).json({ message: "No recent chats found" });
    }

    res.status(200).json(recentChats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent chats" });
  }
};

const getChatByIdController = async (req, res) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat" });
  }
};

const deleteChatByIdController = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await Chat.deleteOne({
      _id: chatId,
    });

    await Message.deleteMany({
      chatId: chatId,
    });

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chat" });
  }
};

export {
  createChatController,
  getRecentChatController,
  getChatByIdController,
  deleteChatByIdController,
};
