import connectDB from "../../utils/db";
import mongoose from "mongoose";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        await connectDB();

        const state = mongoose.connection.readyState;
        const stateMap = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };

        return res.status(200).json({
            success: true,
            database: {
                status: stateMap[state] || "unknown",
                host: mongoose.connection.host,
                name: mongoose.connection.name,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            hint: "Check your MONGODB_URI in .env.local and ensure your IP is whitelisted in MongoDB Atlas.",
            timestamp: new Date().toISOString(),
        });
    }
}
