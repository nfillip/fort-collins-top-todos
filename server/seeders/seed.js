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
    // await Location.create({
    //   name: "Horsetooth Rock",
    //   address: "6550 W County Rd 38 E, Fort Collins CO 80526",
    //   images: ["horsetooth_cxjqyk"],
    //   creator: allUsers[0]._id,
    //   categories: ["sunset", "view"],
    //   imagesURL: ["https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252691/horsetooth_cxjqyk.jpg"],
    //   description: "Scenic view looking over Fort Collins. Must hike 4 miles up the trail to reach this rock summit"
    // })
    // await Location.create({
    //   name: "Duncan's Ridge",
    //   address: "3804 Sky Ridge Ln, Fort Collins, CO 80526",
    //   images: ["duncans_vnllbs"],
    //   creator: allUsers[0]._id,
    //   categories: ["sunset", "view"],
    //   imagesURL: ["https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252691/duncans_vnllbs.jpg"],
    //   description: "Scenic overlook across Horsetooth Resvoir. Short .2 mile hike up some stairs to get here. You can also rock climb here."
    // })
    // await Location.create({
    //   name: "Arthur's Rock",
    //   address: "40.56437, -105.17464",
    //   images: ["arthursrock_c4ecyl"],
    //   creator: allUsers[1]._id,
    //   categories: ["sunset", "view"],
    //   imagesURL: ["https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252691/arthursrock_c4ecyl.jpg"],
    //   description: "Hike 3 miles up Arthur's rock to get a beautiful view of the front range, Fort Collins, and Wellington. Easier hike than Horsetooth Rock."
    // })
    // await Location.create({
    //   name: "Arapaho Bend Natural Area",
    //   address: "40.52532, -104.9967",
    //   images: ["arapahobend_jpsvei"],
    //   creator: allUsers[1]._id,
    //   categories: ["sunset", "view"],
    //   imagesURL: ["https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252691/arapahobend_jpsvei.jpg"],
    //   description: "Lake with some trails right off of I25 and Harmony. Great view of the foot hills in the distance allow for a great sunset spot. "
    // })
    // await Location.create({
    //   name: "Elliots",
    //   address: "234 Linden St. Fort Collins, CO 80524",
    //   images: ["elliots_fagt3v", "elliots2_mbogyp"],
    //   creator: allUsers[2]._id,
    //   categories: ["bar"],
    //   imagesURL: ["https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252692/elliots_fagt3v.jpg", "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337384/elliots2_mbogyp.jpg"],
    //   description: "Popular martini bar with a variety of martinis and other specialized cocktails. Right in old town!"
    // })
    // await Location.create({
    //   name: "Social",
    //   address: "1 Old Town Square #7, Fort Collins, CO 80524",
    //   images: ["social_hxythn", "social2_tscvys"],
    //   creator: allUsers[2]._id,
    //   categories: ["bar"],
    //   imagesURL: ["https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252692/social_hxythn.jpg" , "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337384/social2_tscvys.jpg"],
    //   description: "Beautiful speak easy decorated to make you feel like you're in Prohibition times. Great atmosphere, decorations, and cocktails. Probably the most visually aesthetic bar in Fort Collins."
    // })
    // await Location.create({
    //   name: "The Still Whiskey",
    //   address: "151 N College Ave, Fort Collins, CO 80524",
    //   images: ["whiskeystill_lv9ogg", "whiskeystill2_madyt6"],
    //   creator: allUsers[3]._id,
    //   categories: ["restaurant"],
    //   imagesURL: ["https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252692/whiskeystill_lv9ogg.jpg", "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337387/whiskeystill2_madyt6.jpg"],
    //   description: "Steakhouse with a wide variety of steaks, meats, and whiskeys. Great casual atmosphere with whiskey barrels decorating the walls"
    // })
    // await Location.create({
    //   name: "Rio Grande Mexican Restaurant",
    //   address: "143 W Mountain Ave, Fort Collins, CO 80524",
    //   images: ["rio_diqxtp", "io2_jjzkfh"],
    //   creator: allUsers[3]._id,
    //   categories: ["restaurant"],
    //   imagesURL: ["https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252692/rio_diqxtp.jpg", "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337384/rio2_jjzkfh.jpg"],
    //   description: "Fort Collin's most famous Mexican restaurant. The Rio is known for great foods and even better Margaritas."
    // })
    // for(let i = 0 ; i<allUsers.length; i++){
    //   if(i === allUsers.length-1){
    //     const singleUser = await User.findOneAndUpdate(
    //       {_id: allUsers[i]._id.toString()},
    //       {$push: {friendRequests: allUsers[0]._id.toString()}}
    //     )
    //   }else{
    //     const singleUser = await User.findOneAndUpdate(
    //       {_id: allUsers[i]._id.toString()},
    //       {$push: {friendRequests: allUsers[i+1]._id.toString()}}
    //     )
    //   }
    // }
    console.log("seeding complete");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
