import connectDB from "../../../utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  await connectDB();

  const { address } = req.query;

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ walletAddress: address.toLowerCase() });
      if (!user)
        return res.status(404).json({ success: false, message: "User not found" });
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      // Support both plain updates and MongoDB operators like $push
      const hasOperators = Object.keys(req.body).some((k) => k.startsWith("$"));
      const updateDoc = hasOperators ? req.body : { $set: req.body };

      const user = await User.findOneAndUpdate(
        { walletAddress: address.toLowerCase() },
        updateDoc,
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
