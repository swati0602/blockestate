import mongoose from "mongoose";

export const ACTIVITY_TYPES = [
  "PROPERTY_LISTED",
  "PROPERTY_PURCHASED",
  "PROPERTY_UPDATED",
  "PRICE_UPDATED",
  "REVIEW_ADDED",
  "REVIEW_LIKED",
];

const ActivityLogSchema = new mongoose.Schema(
  {
    type:        { type: String, enum: ACTIVITY_TYPES, required: true },
    actor:       { type: String, required: true, lowercase: true, trim: true },
    propertyId:  { type: Number, default: null },
    txHash:      { type: String, default: null, trim: true },
    blockNumber: { type: Number, default: null },
    amount:      { type: Number, default: 0 },   // ETH
    reason:      { type: String, default: "" },  // human-readable why
    metadata:    { type: mongoose.Schema.Types.Mixed, default: {} },
    timestamp:   { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ActivityLogSchema.index({ type: 1 });
ActivityLogSchema.index({ actor: 1 });
ActivityLogSchema.index({ propertyId: 1 });
ActivityLogSchema.index({ timestamp: -1 });

const ActivityLog =
  mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);

export default ActivityLog;
