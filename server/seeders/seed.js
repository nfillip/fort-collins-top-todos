const userSeeds = require("./userSeeds.json");
const locationSeeds = require("./locationSeeds.json")
const cleanDB = require("./cleanDB")
const db = require("../config/connection");
const { User, Location } = require("../models");

db.once("open", async () => {
  try {
    await cleanDB("User", "users" )
    await cleanDB("Location", "locations" )
    await cleanDB("Match", "matches" )
    await cleanDB("Message", "messages" )
    const newSeed = await User.create(userSeeds);
    const allUsers = await User.find();
    const newLocSeed = await Location.create(locationSeeds)
    console.log("seeding complete");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
