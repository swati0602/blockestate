const mongoose = require("mongoose");

const uri =
  "mongodb://swati0602shinde_db_user:dRGfSfCLVkSE7nU5@ac-dln4jsm-shard-00-00.cnujifo.mongodb.net:27017,ac-dln4jsm-shard-00-01.cnujifo.mongodb.net:27017,ac-dln4jsm-shard-00-02.cnujifo.mongodb.net:27017/blockestate?authSource=admin&tls=true";

const sampleUsers = [
  {
    walletAddress: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef01",
    username: "Alex Morgan",
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@blockestate.io",
    bio: "Real estate investor with 10+ years of experience. Passionate about decentralized property ownership.",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "+1-555-0101",
    role: "Investor",
    website: "https://alexmorgan.io",
    twitter: "@alexmorgan",
    instagram: "@alex.morgan.re",
    lastLogin: new Date("2026-02-25T10:30:00Z"),
    properties: [1, 2],
    createdAt: new Date("2025-06-10T08:00:00Z"),
    updatedAt: new Date("2026-02-25T10:30:00Z"),
  },
  {
    walletAddress: "0x2b3c4d5e6f7890abcdef1234567890abcdef0202",
    username: "Sarah Chen",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@blockestate.io",
    bio: "Property developer specializing in luxury apartments and villas across Asia-Pacific.",
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "+65-9123-4567",
    role: "Developer",
    website: "https://sarahchen.dev",
    twitter: "@sarahchen_re",
    instagram: "@sarahchen.estate",
    lastLogin: new Date("2026-02-26T14:15:00Z"),
    properties: [3, 4],
    createdAt: new Date("2025-07-22T09:00:00Z"),
    updatedAt: new Date("2026-02-26T14:15:00Z"),
  },
  {
    walletAddress: "0x3c4d5e6f7890abcdef1234567890abcdef030303",
    username: "Raj Patel",
    firstName: "Raj",
    lastName: "Patel",
    email: "raj.patel@blockestate.io",
    bio: "Blockchain enthusiast and commercial real estate broker based in Mumbai.",
    avatar: "https://i.pravatar.cc/150?img=8",
    phone: "+91-98765-43210",
    role: "Broker",
    website: "",
    twitter: "@rajpatel_re",
    instagram: "@rajpatel.property",
    lastLogin: new Date("2026-02-27T09:00:00Z"),
    properties: [5],
    createdAt: new Date("2025-09-05T11:00:00Z"),
    updatedAt: new Date("2026-02-27T09:00:00Z"),
  },
  {
    walletAddress: "0x4d5e6f7890abcdef1234567890abcdef04040404",
    username: "Emily Rodriguez",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@blockestate.io",
    bio: "First-time NFT real estate buyer. Looking for affordable apartments in major cities.",
    avatar: "https://i.pravatar.cc/150?img=9",
    phone: "+1-555-0202",
    role: "Buyer",
    website: "",
    twitter: "@emilyrodriguez",
    instagram: "",
    lastLogin: new Date("2026-02-20T16:45:00Z"),
    properties: [],
    createdAt: new Date("2026-01-15T07:00:00Z"),
    updatedAt: new Date("2026-02-20T16:45:00Z"),
  },
  {
    walletAddress: "0x5e6f7890abcdef1234567890abcdef0505050505",
    username: "James Wu",
    firstName: "James",
    lastName: "Wu",
    email: "james.wu@blockestate.io",
    bio: "NFT collector and land investor. Building a metaverse real estate portfolio.",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "+852-6543-2109",
    role: "Collector",
    website: "https://jameswu.xyz",
    twitter: "@jameswu_nft",
    instagram: "@jameswu.land",
    lastLogin: new Date("2026-02-27T08:00:00Z"),
    properties: [6],
    createdAt: new Date("2025-11-30T12:00:00Z"),
    updatedAt: new Date("2026-02-27T08:00:00Z"),
  },
];

const sampleProperties = [
  {
    tokenId: 1,
    owner: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef01",
    title: "Luxury Sea-View Villa in Miami",
    description:
      "A stunning 5-bedroom beachfront villa with panoramic ocean views, infinity pool, and smart home automation. Perfect for high-net-worth buyers seeking a trophy asset.",
    category: "Villa",
    price: 12.5,
    rentalPrice: 0.8,
    location: {
      address: "2301 Ocean Drive",
      city: "Miami",
      state: "Florida",
      country: "USA",
      zipCode: "33139",
      coordinates: { lat: 25.7826, lng: -80.1341 },
    },
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=800",
    ],
    documents: [],
    bedrooms: 5,
    bathrooms: 6,
    area: 6200,
    isListed: true,
    isSold: false,
    isRented: false,
    rating: 4.9,
    reviewCount: 14,
    createdAt: new Date("2025-08-01T10:00:00Z"),
    updatedAt: new Date("2026-01-10T12:00:00Z"),
  },
  {
    tokenId: 2,
    owner: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef01",
    title: "Modern Downtown Apartment - New York",
    description:
      "Sleek 2-bedroom apartment in the heart of Manhattan. Floor-to-ceiling windows, open-plan kitchen, and rooftop access. Walking distance to Central Park.",
    category: "Apartment",
    price: 4.2,
    rentalPrice: 0.25,
    location: {
      address: "550 West 54th Street",
      city: "New York",
      state: "New York",
      country: "USA",
      zipCode: "10019",
      coordinates: { lat: 40.7654, lng: -73.9891 },
    },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    documents: [],
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    isListed: true,
    isSold: false,
    isRented: true,
    rating: 4.6,
    reviewCount: 9,
    createdAt: new Date("2025-09-15T08:00:00Z"),
    updatedAt: new Date("2026-02-01T09:00:00Z"),
  },
  {
    tokenId: 3,
    owner: "0x2b3c4d5e6f7890abcdef1234567890abcdef0202",
    title: "Premium Commercial Space - Singapore CBD",
    description:
      "Grade-A office space on the 32nd floor of a landmark tower in Raffles Place. Unobstructed city views, full fit-out, and 24/7 building access.",
    category: "Commercial",
    price: 22.00,
    rentalPrice: 1.40,
    location: {
      address: "1 Raffles Place",
      city: "Singapore",
      state: "Central Region",
      country: "Singapore",
      zipCode: "048616",
      coordinates: { lat: 1.2841, lng: 103.8514 },
    },
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    ],
    documents: [],
    bedrooms: 0,
    bathrooms: 4,
    area: 4500,
    isListed: true,
    isSold: false,
    isRented: false,
    rating: 4.7,
    reviewCount: 6,
    createdAt: new Date("2025-10-01T07:00:00Z"),
    updatedAt: new Date("2026-01-20T10:00:00Z"),
  },
  {
    tokenId: 4,
    owner: "0x2b3c4d5e6f7890abcdef1234567890abcdef0202",
    title: "Skyline Penthouse - Dubai Marina",
    description:
      "4-bedroom penthouse with a private rooftop terrace overlooking Dubai Marina. Features a private pool, home theatre, and smart automation.",
    category: "Apartment",
    price: 18.75,
    rentalPrice: 1.1,
    location: {
      address: "Marina Promenade, Tower 7",
      city: "Dubai",
      state: "Dubai",
      country: "UAE",
      zipCode: "00000",
      coordinates: { lat: 25.0805, lng: 55.1403 },
    },
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    documents: [],
    bedrooms: 4,
    bathrooms: 5,
    area: 5800,
    isListed: true,
    isSold: false,
    isRented: false,
    rating: 4.8,
    reviewCount: 11,
    createdAt: new Date("2025-11-05T09:00:00Z"),
    updatedAt: new Date("2026-02-15T11:00:00Z"),
  },
  {
    tokenId: 5,
    owner: "0x3c4d5e6f7890abcdef1234567890abcdef030303",
    title: "Heritage Bungalow - Mumbai Suburbs",
    description:
      "Restored colonial bungalow on a 10,000 sq ft plot in Bandra West. 3 bedrooms with original teak woodwork, landscaped garden, and servant quarters.",
    category: "House",
    price: 6.8,
    rentalPrice: 0.45,
    location: {
      address: "14 Chapel Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipCode: "400050",
      coordinates: { lat: 19.0596, lng: 72.8295 },
    },
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    ],
    documents: [],
    bedrooms: 3,
    bathrooms: 3,
    area: 3800,
    isListed: true,
    isSold: false,
    isRented: false,
    rating: 4.5,
    reviewCount: 7,
    createdAt: new Date("2025-12-01T06:00:00Z"),
    updatedAt: new Date("2026-02-10T08:00:00Z"),
  },
  {
    tokenId: 6,
    owner: "0x5e6f7890abcdef1234567890abcdef0505050505",
    title: "Agricultural Land - Napa Valley",
    description:
      "Prime 50-acre vineyard land in Napa Valley with water rights and agricultural zoning. Ideal for boutique winery development or long-term investment.",
    category: "Land",
    price: 35.0,
    rentalPrice: 0.0,
    location: {
      address: "Silverado Trail, Napa",
      city: "Napa",
      state: "California",
      country: "USA",
      zipCode: "94558",
      coordinates: { lat: 38.5025, lng: -122.2654 },
    },
    images: [
      "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    ],
    documents: [],
    bedrooms: 0,
    bathrooms: 0,
    area: 2178000,
    isListed: true,
    isSold: false,
    isRented: false,
    rating: 4.3,
    reviewCount: 4,
    createdAt: new Date("2026-01-10T10:00:00Z"),
    updatedAt: new Date("2026-02-20T12:00:00Z"),
  },
];

mongoose.connect(uri).then(async () => {
  const db = mongoose.connection.db;

  // Relax numeric field types in the properties validator to accept int/long/double
  await db.command({
    collMod: "properties",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["owner", "title", "price"],
        properties: {
          tokenId:     { bsonType: ["int", "long", "double", "null"] },
          owner:       { bsonType: "string" },
          title:       { bsonType: "string" },
          description: { bsonType: "string" },
          category: {
            bsonType: "string",
            enum: ["House", "Apartment", "Villa", "Commercial", "Land", "Other"],
          },
          price:       { bsonType: ["int", "long", "double"] },
          rentalPrice: { bsonType: ["int", "long", "double"] },
          images:      { bsonType: "array" },
          documents:   { bsonType: "array" },
          bedrooms:    { bsonType: ["int", "long", "double"] },
          bathrooms:   { bsonType: ["int", "long", "double"] },
          area:        { bsonType: ["int", "long", "double"] },
          isListed:    { bsonType: "bool" },
          isSold:      { bsonType: "bool" },
          isRented:    { bsonType: "bool" },
          rating:      { bsonType: ["int", "long", "double"] },
          reviewCount: { bsonType: ["int", "long", "double"] },
        },
      },
    },
    validationLevel: "moderate",
  });
  console.log("✅ Updated properties validator");

  await db.collection("users").deleteMany({});
  await db.collection("properties").deleteMany({});
  console.log("🧹 Cleared existing data");

  await db.collection("users").insertMany(sampleUsers);
  console.log(`✅ Inserted ${sampleUsers.length} users`);

  await db.collection("properties").insertMany(sampleProperties);
  console.log(`✅ Inserted ${sampleProperties.length} properties`);

  console.log("\n📊 Summary:");
  console.log("   users      :", await db.collection("users").countDocuments());
  console.log("   properties :", await db.collection("properties").countDocuments());

  process.exit(0);
}).catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
