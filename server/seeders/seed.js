const userSeeds = require("./userSeeds.json");
const db = require("../config/connection");
const { User, Location } = require("../models");

db.once("open", async () => {
  try {
    const newSeed = await User.create(userSeeds);
    const allUsers = await User.find();
    await Location.create({
      name: "Horsetooth Rock",
      address: "6550 W County Rd 38 E, Fort Collins CO 80526",
      images: ["horsetooth_cxjqyk"],
      creator: allUsers[0]._id,
      categories: ["sunrise", "views"]
    })
    await Location.create({
      name: "Duncan's Ridge",
      address: "3804 Sky Ridge Ln, Fort Collins, CO 80526",
      images: ["duncans_vnllbs"],
      creator: allUsers[0]._id,
      categories: ["sunrise", "views"]
    })
    await Location.create({
      name: "Arthur's Rock",
      address: "40.56437, -105.17464",
      images: ["arthursrock_c4ecyl"],
      creator: allUsers[1]._id,
      categories: ["sunrise", "views"]
    })
    await Location.create({
      name: "Arapaho Bend Natural Area",
      address: "40.52532, -104.9967",
      images: ["arapahobend_jpsvei"],
      creator: allUsers[1]._id,
      categories: ["sunrise", "views"]
    })
    await Location.create({
      name: "Elliots",
      address: "234 Linden St. Fort Collins, CO 80524",
      images: ["elliots_fagt3v"],
      creator: allUsers[2]._id,
      categories: ["bars"]
    })
    await Location.create({
      name: "Social",
      address: "1 Old Town Square #7, Fort Collins, CO 80524",
      images: ["social_hxythn"],
      creator: allUsers[2]._id,
      categories: ["sunrise", "views"]
    })
    await Location.create({
      name: "The Still Whiskey",
      address: "151 N College Ave, Fort Collins, CO 80524",
      images: ["whiskeystill_lv9ogg"],
      creator: allUsers[3]._id,
      categories: ["restaurants"]
    })
    await Location.create({
      name: "Rio Grande Mexican Restaurant",
      address: "143 W Mountain Ave, Fort Collins, CO 80524",
      images: ["rio_diqxtp"],
      creator: allUsers[3]._id,
      categories: ["restaurant"]
    })
    for(let i = 0 ; i<allUsers.length; i++){
      if(i === allUsers.length-1){
        const singleUser = await User.findOneAndUpdate(
          {_id: allUsers[i]._id.toString()},
          {$push: {friendRequests: allUsers[0]._id.toString()}}
        )
      }else{
        const singleUser = await User.findOneAndUpdate(
          {_id: allUsers[i]._id.toString()},
          {$push: {friendRequests: allUsers[i+1]._id.toString()}}
        )
      }
    }
    console.log("seeding complete");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
