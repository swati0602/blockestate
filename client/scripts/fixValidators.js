const mongoose = require("mongoose");

const uri =
  "mongodb://swati0602shinde_db_user:dRGfSfCLVkSE7nU5@ac-dln4jsm-shard-00-00.cnujifo.mongodb.net:27017,ac-dln4jsm-shard-00-01.cnujifo.mongodb.net:27017,ac-dln4jsm-shard-00-02.cnujifo.mongodb.net:27017/blockestate?authSource=admin&tls=true";

mongoose.connect(uri).then(async () => {
  const db = mongoose.connection.db;

  // All valid categories (frontend + legacy seed data)
  const ALL_CATEGORIES = [
    "Housing", "Rental", "Farmhouse", "Office", "Commercial", "Country",
    "House", "Apartment", "Villa", "Land", "Other",
  ];

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
          category:    { bsonType: "string", enum: ALL_CATEGORIES },
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
  console.log("✅ properties validator updated with all categories");

  // Also relax users validator to moderate so profile updates never block
  await db.command({
    collMod: "users",
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
    validationLevel: "moderate",
  });
  console.log("✅ users validator updated");

  process.exit(0);
}).catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
