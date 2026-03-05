import connectDB from "../../../utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { walletAddress } = req.body;
      if (!walletAddress)
        return res.status(400).json({ success: false, message: "walletAddress is required" });

      // Upsert user: create on first login, update lastLogin on subsequent logins
      const { walletAddress: _w, ...rest } = req.body;
      const user = await User.findOneAndUpdate(
        { walletAddress: walletAddress.toLowerCase() },
        {
          $set:           { lastLogin: new Date(), ...rest, walletAddress: walletAddress.toLowerCase() },
          $setOnInsert:  { createdAt: new Date() },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
