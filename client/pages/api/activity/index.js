import connectDB from "../../../utils/db";
import ActivityLog from "../../../models/ActivityLog";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { actor, propertyId, type, page = 1, limit = 100 } = req.query;
      const filter = {};
      if (actor)      filter.actor      = actor.toLowerCase();
      if (propertyId) filter.propertyId = Number(propertyId);
      if (type && type !== "ALL") filter.type = type;

      const skip  = (Number(page) - 1) * Number(limit);
      const [data, total] = await Promise.all([
        ActivityLog.find(filter).sort({ timestamp: -1 }).skip(skip).limit(Number(limit)),
        ActivityLog.countDocuments(filter),
      ]);

      return res.status(200).json({ success: true, data, total, page: Number(page), limit: Number(limit) });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { type, actor, propertyId, txHash, blockNumber, amount, reason, metadata } = req.body;

      if (!type || !actor) {
        return res.status(400).json({ success: false, message: "Missing required fields: type, actor" });
      }

      let log;
      if (txHash) {
        // Upsert by txHash so retries don't create duplicates
        log = await ActivityLog.findOneAndUpdate(
          { txHash },
          {
            type,
            actor:       actor.toLowerCase(),
            propertyId:  propertyId  ?? null,
            txHash,
            blockNumber: blockNumber ?? null,
            amount:      parseFloat(amount) || 0,
            reason:      reason   || "",
            metadata:    metadata || {},
            timestamp:   new Date(),
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } else {
        log = await ActivityLog.create({
          type,
          actor:       actor.toLowerCase(),
          propertyId:  propertyId  ?? null,
          blockNumber: blockNumber ?? null,
          amount:      parseFloat(amount) || 0,
          reason:      reason   || "",
          metadata:    metadata || {},
          timestamp:   new Date(),
        });
      }

      return res.status(201).json({ success: true, data: log });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
