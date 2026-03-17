import connectDB from "../../../utils/db";
import Transaction from "../../../models/Transaction";
import Property from "../../../models/Property";

export default async function handler(req, res) {
  await connectDB();

  // GET — publicly readable, no auth needed
  if (req.method === "GET") {
    try {
      const { buyer, propertyId, page = 1, limit = 50 } = req.query;
      const filter = {};
      if (buyer)      filter.buyer      = buyer.toLowerCase();
      if (propertyId) filter.propertyId = Number(propertyId);

      const skip = (Number(page) - 1) * Number(limit);
      const [data, total] = await Promise.all([
        Transaction.find(filter).sort({ timestamp: -1 }).skip(skip).limit(Number(limit)),
        Transaction.countDocuments(filter),
      ]);

      return res.status(200).json({ success: true, data, total, page: Number(page), limit: Number(limit) });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST — called internally after a successful buyProperty tx
  if (req.method === "POST") {
    try {
      const { txHash, buyer, seller, propertyId, amount, blockNumber } = req.body;

      if (!txHash || !buyer || propertyId == null || amount == null) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      // Server-side guard: buyer must not be the current owner or original lister
      const buyerAddr = buyer.toLowerCase();
      const propertyDoc = await Property.findOne({ tokenId: Number(propertyId) });
      if (propertyDoc) {
        if (buyerAddr === propertyDoc.owner) {
          return res.status(400).json({ success: false, message: "You cannot buy your own property" });
        }
        if (propertyDoc.seller && buyerAddr === propertyDoc.seller) {
          return res.status(400).json({ success: false, message: "You cannot buy a property you listed" });
        }
      }

      const tx = await Transaction.findOneAndUpdate(
        { txHash },
        { txHash, buyer: buyer.toLowerCase(), seller: (seller || "").toLowerCase(), propertyId: Number(propertyId), amount: parseFloat(amount), blockNumber: blockNumber || null, timestamp: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      return res.status(201).json({ success: true, data: tx });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
