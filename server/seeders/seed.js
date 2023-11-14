const userSeeds = require("./userSeeds.json");
const db = require("../config/connection");
const { User, Location } = require("../models");

db.once("open", async () => {
  try {
    const newSeed = await User.create(userSeeds);
    const allUsers = await User.find();
    console.log(allUsers[0]._id)
    const newLocation = await Location.create({
      name: "Horsetooth Rock",
      address: "6550 W County Rd 38 E, Fort Collins CO 80526",
      creator: allUsers[0]._id,
      categories: ["sunrise", "views"]
    });
    console.log("seeding complete");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
