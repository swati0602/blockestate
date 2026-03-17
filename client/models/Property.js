import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    // On-chain reference
    tokenId: {
      type: Number,
      unique: true,
      sparse: true, // allow null until minted
    },

    // Owner wallet address (current owner, changes on sale)
    owner: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // Original lister address (never changes after creation)
    seller: {
      type: String,
      lowercase: true,
      trim: true,
    },

    // Basic details
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Housing", "Rental", "Farmhouse", "Office", "Commercial", "Country", "House", "Apartment", "Villa", "Land", "Other"],
      default: "Other",
    },

    // Pricing
    price: { type: Number, required: true, min: 0 }, // in ETH
    rentalPrice: { type: Number, default: 0 },        // per month in ETH

    // Location
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    // Media
    images: [{ type: String }],   // IPFS / Pinata URLs
    documents: [{ type: String }], // IPFS document CIDs

    // Specs
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, default: 0 }, // sq ft

    // Status
    isListed: { type: Boolean, default: true },
    isSold: { type: Boolean, default: false },
    isRented: { type: Boolean, default: false },

    // Ratings
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },

    // Off-chain interest list (supports add/remove and de-duplication)
    interestedUsers: [{ type: String, lowercase: true, trim: true }],
  },
  { timestamps: true }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
