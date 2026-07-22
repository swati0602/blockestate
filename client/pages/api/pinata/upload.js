import axios from "axios";

const FormData = require("form-data");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { filename, content, mimeType = "application/octet-stream" } = req.body || {};

    if (!filename || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing file data. Send filename and content as base64.",
      });
    }

    const pinataApiKey = process.env.PINATA_API_KEY;
    const pinataSecretKey = process.env.PINATA_SECRET_KEY;

    if (!pinataApiKey || !pinataSecretKey) {
      return res.status(500).json({
        success: false,
        message: "Pinata credentials are not configured on the server.",
      });
    }

    const buffer = Buffer.from(content, "base64");
    const formData = new FormData();
    formData.append("file", buffer, {
      filename,
      contentType: mimeType,
      knownLength: buffer.length,
    });

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretKey,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

    return res.status(200).json({ success: true, ipfsUrl });
  } catch (error) {
    console.error("Pinata upload error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.error || "Failed to upload image.",
    });
  }
}
