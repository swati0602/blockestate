import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Global cache to prevent multiple connections in development
 * (Next.js hot-reload would otherwise open a new connection each time).
 */
let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  // If already connected, return the cached connection
  if (cached.conn) {
    // Verify the existing connection is still alive
    if (mongoose.connection.readyState === 1) {
      return cached.conn;
    }
    // Connection dropped — reset cache and reconnect
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000, // 15s to find a server
      socketTimeoutMS: 45000,          // 45s before socket timeout
      connectTimeoutMS: 15000,         // 15s to establish connection
      maxPoolSize: 10,                 // maintain up to 10 socket connections
      retryWrites: true,
      w: "majority",
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log("✅ MongoDB Connected:", m.connection.host);

        // Handle unexpected disconnects
        mongoose.connection.on("disconnected", () => {
          console.warn("⚠️ MongoDB disconnected. Will reconnect on next request.");
          cached.conn = null;
          cached.promise = null;
        });

        mongoose.connection.on("error", (err) => {
          console.error("❌ MongoDB connection error:", err.message);
          cached.conn = null;
          cached.promise = null;
        });

        return m;
      })
      .catch((err) => {
        cached.promise = null; // allow retry on next request
        console.error("❌ MongoDB connection failed:", err.message);
        throw new Error(`Database connection failed: ${err.message}`);
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
