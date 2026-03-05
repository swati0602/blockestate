const mongoose = require("mongoose");

const uri =
  "mongodb://swati0602shinde_db_user:dRGfSfCLVkSE7nU5@ac-dln4jsm-shard-00-00.cnujifo.mongodb.net:27017,ac-dln4jsm-shard-00-01.cnujifo.mongodb.net:27017,ac-dln4jsm-shard-00-02.cnujifo.mongodb.net:27017/blockestate?authSource=admin&tls=true";

mongoose.connect(uri).then(async () => {
  const db = mongoose.connection.db;

  // ─── Drop & recreate to clear any sample data ──────────────────
  const existing = await db.listCollections().toArray();
  for (const col of existing) {
    await db.collection(col.name).drop();
    console.log(`🗑️  Dropped existing collection: ${col.name}`);
  }

  // ─── USERS collection ─────────────────────────────────────────
  await db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["walletAddress"],
        properties: {
          walletAddress: { bsonType: "string" },
          username:      { bsonType: "string" },
          firstName:     { bsonType: "string" },
          lastName:      { bsonType: "string" },
          email:         { bsonType: "string" },
          bio:           { bsonType: "string" },
          avatar:        { bsonType: "string" },
          phone:         { bsonType: "string" },
          role:          { bsonType: "string" },
          website:       { bsonType: "string" },
          twitter:       { bsonType: "string" },
          instagram:     { bsonType: "string" },
          lastLogin:     { bsonType: "date" },
          properties:    { bsonType: "array" },
        },
      },
    },
  });

  await db.collection("users").createIndex(
    { walletAddress: 1 },
    { unique: true, name: "walletAddress_unique" }
  );
  console.log("✅ users collection created");

  // ─── PROPERTIES collection ─────────────────────────────────────
  await db.createCollection("properties", {
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
            enum: ["Housing", "Rental", "Farmhouse", "Office", "Commercial", "Country", "House", "Apartment", "Villa", "Land", "Other"],
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
  });

  await db.collection("properties").createIndex(
    { tokenId: 1 },
    { unique: true, sparse: true, name: "tokenId_unique_sparse" }
  );
  await db.collection("properties").createIndex({ owner: 1 },    { name: "owner_idx" });
  await db.collection("properties").createIndex({ category: 1 }, { name: "category_idx" });
  await db.collection("properties").createIndex({ isListed: 1 }, { name: "isListed_idx" });
  console.log("✅ properties collection created");

  // ─── Summary ───────────────────────────────────────────────────
  const cols = await db.listCollections().toArray();
  console.log("\n📦 Collections in blockestate:", cols.map((c) => c.name).join(", "));

  process.exit(0);
}).catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
