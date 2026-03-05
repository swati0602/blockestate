import connectDB from "../../../utils/db";
import Property from "../../../models/Property";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const properties = await Property.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: properties });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const {
        tokenId,
        owner,
        title,
        description,
        category,
        price,
        images,
        location,
        bedrooms,
        bathrooms,
        area,
      } = req.body;

      const updateData = {
        owner: owner?.toLowerCase(),
        title,
        description,
        category,
        price:       parseFloat(price)    || 0,
        images:      Array.isArray(images) ? images : [images].filter(Boolean),
        location:    location || {},
        bedrooms:    parseInt(bedrooms)   || 0,
        bathrooms:   parseInt(bathrooms)  || 0,
        area:        parseFloat(area)     || 0,
      };

      let property;
      if (tokenId != null) {
        // Upsert by tokenId when we have one (post-blockchain confirmation)
        updateData.tokenId = tokenId;
        property = await Property.findOneAndUpdate(
          { tokenId },
          updateData,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } else {
        // No tokenId yet — just insert a new doc
        property = await Property.create(updateData);
      }

      return res.status(201).json({ success: true, data: property });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

