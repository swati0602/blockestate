import connectDB from "../../../utils/db";
import Property from "../../../models/Property";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const property = await Property.findOne({ tokenId: Number(id) });
      if (!property)
        return res.status(404).json({ success: false, message: "Property not found" });
      return res.status(200).json({ success: true, data: property });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const hasOperators = Object.keys(req.body).some((k) => k.startsWith("$"));
      const updateDoc = hasOperators ? req.body : { $set: req.body };

      const property = await Property.findOneAndUpdate(
        { tokenId: Number(id) },
        updateDoc,
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.status(200).json({ success: true, data: property });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Property.findOneAndDelete({ tokenId: Number(id) });
      return res.status(200).json({ success: true, message: "Property deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
