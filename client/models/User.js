import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username:  { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName:  { type: String, default: "" },
    email:     { type: String, default: "" },
    bio:       { type: String, default: "" },
    avatar:    { type: String, default: "" },
    phone:     { type: String, default: "" },
    role:      { type: String, default: "" },
    website:   { type: String, default: "" },
    twitter:   { type: String, default: "" },
    instagram: { type: String, default: "" },
    // Track when they last connected their wallet
    lastLogin: { type: Date, default: Date.now },
    // Properties they own (productIDs from blockchain)
    properties: [{ type: Number }],
    // Properties the user marked as interested
    interestedProperties: [{ type: Number }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
