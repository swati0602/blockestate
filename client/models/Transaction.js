import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    txHash:     { type: String, required: true, unique: true, trim: true },
    buyer:      { type: String, required: true, lowercase: true, trim: true },
    seller:     { type: String, default: "", lowercase: true, trim: true },
    propertyId: { type: Number, required: true },
    amount:     { type: Number, required: true },   // in ETH
    blockNumber:{ type: Number, default: null },
    timestamp:  { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;
