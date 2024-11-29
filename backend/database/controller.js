/**Controller */
const Users = require("../../src/app/model/user");
const Businesses = require("../../src/app/model/business");
const Artisans = require("../../src/app/model/artisan");
const mongoose = require("mongoose");
const geocoder = require('../../utils/geocoder');


//---------------------------------------------------------------------------------------------
//User database here
//---------------------------------------------------------------------------------------------

async function getUsers(req, res) {
    try {
      
      const users = await Users.find({ role: "broker" });
  
      if (!users) return res.status(404).json({ error: "Data not Found" });
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ error: "Error while fetching Data" });
    }
  }


async function getUser(req, res) {
    try {
      const { userID } = req.params;
  
      if (userID) {
        const user = await Users.findById(userID);
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not selected" });
      }
    } catch (error) {
      res.status(404).json({ error: "Cannot get User" });
    }
  }

  async function postUser(req, res) {
    try {
      const formData = req.body;
      if (!formData)
        return res.status(404).json({ error: "Form Data Not Provided" });
  
      const newUser = await Users.create(formData);
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(404).json({ error });
    }
  }

  async function putUser(req, res) {
    try {
      const { userID } = req.query;
      const formData = req.body;
  
      if (userID && formData) {
        const user = await Users.findByIdAndUpdate(userID, formData);
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User Not Selected" });
      }
    } catch (error) {
      res.status(404).json({ error: "Error while updating the Data" });
    }
  }

  async function deleteUser(req, res) {
    try {
      const { userID } = req.query;
  
      if (userID) {
        const user = await Users.findByIdAndDelete(userID);
        return res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not selected" });
      }
    } catch (error) {
      res.status(404).json({ error: "Error while deleting user" });
    }
  }

  async function checkUser(req, res) {
    try {
      const { email } = await req.params;
      const user = await Users.findOne({ email }).select("_id");
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  

//---------------------------------------------------------------------------------------------
//Business database here
//---------------------------------------------------------------------------------------------

async function getBusinessesInRadius(req, res) {
  try {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    if (!loc.length) {
      return res.status(404).json({ error: "Invalid zipcode or location not found" });
    }
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calculate radius in radians (distance / Earth's radius in km)
    const radius = distance / 6378;

    // Find businesses within the radius
    const business = await Businesses.find({
      adress: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    if (!business.length) {
      return res.status(404).json({ error: "No businesses found in the specified radius" });
    }

    res.status(200).json({
      success: true,
      count: business.length,
      data: business,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



//get the businesses 
async function getBusinesses(req, res) {
  try {
    const business = await Businesses.find({});
    if (!business) {
      return res.status(404).json({ error: "Data not Found" });
    }
    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// get the businesses for the user in session
async function getUserBusinesses(req, res) {
  try {
    const { userID } = req.params;

    // Ensure userID is a valid ObjectId
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid or missing user ID" });
    }

    // Convert userID to an ObjectId
    const objectId = new mongoose.Types.ObjectId(userID);

    // Query businesses where the owner matches the userID
    const businesses = await Businesses.find({ owner: objectId });

    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getBusiness(req, res) {
  try {
    const { businessId } = req.params;

    if (businessId) {
      const business = await Businesses.findById(businessId);
      if (business) {
        res.status(200).json(business);
      } else {
        res.status(404).json({ error: "Business not found" });
      }
    } else {
      res.status(400).json({ error: "Business ID not selected" });
    }
  } catch (error) {
    res.status(500).json({ error: "Cannot get business" });
  }
}

//Adding business
async function addBusiness(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: "Form Data Not Provided" });
    }

    // Log the collection name being used
    console.log("Collection name:", Businesses.collection.name);

    // Create the new business entry
    const newBusiness = await Businesses.create(formData);

    console.log("Inserted Business into DB:", newBusiness);

    return res.status(201).json({ success: true, data: newBusiness });
  } catch (error) {
    // Log any errors for debugging
    console.error("Error adding business:", error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}



//Updating a specific business based on ID
async function putBusiness(req, res) {
  try {
    const { businessId } = req.query;
    const formData = req.body;

    if (businessId && formData) {
      const business = await Businesses.findByIdAndUpdate(businessId, formData);
      res.status(200).json(business);
    } else {
      res.status(404).json({ error: "Business Not Selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while updating the Business" });
  }
}


async function deleteBusiness(req, res) {
  try {
    const { businessId } = req.query;

    if (businessId) {
      const business = await Businesses.findByIdAndDelete(businessId);
      return res.status(200).json(business);
    } else {
      res.status(404).json({ error: "Business not selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while deleting Business" });
  }
}

const getBusinessesFiltered = async (req, res, filters) => {
  try {
    let query = {};

    // Text search across name, description, and category
    if (filters.term) {
      const searchRegex = new RegExp(filters.term, "i");
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ];
    }

    // Exact match for category (optional filter)
    if (filters.categoryType) {
      query.category = filters.categoryType;
    }

    // If both zipcode and radius are provided, use getBusinessesInRadius
    if (filters.zipcode && filters.radius) {
      try {
        // Create a new request-like object to use getBusinessesInRadius
        const radiusReq = {
          params: {
            zipcode: filters.zipcode,
            distance: filters.radius
          }
        };

        const radiusResult = await new Promise((resolve, reject) => {
          getBusinessesInRadius(radiusReq, {
            status: (code) => ({
              json: (data) => {
                if (code === 200) resolve(data.data);
                else reject(new Error(data.error));
              }
            })
          });
        });

        // If radius filtering is successful, filter further if needed
        if (filters.term || filters.categoryType) {
          // Apply additional text and category filters to radius-filtered results
          return res.status(200).json(
            radiusResult.filter(business => {
              let matchesTerm = !filters.term;
              let matchesCategory = !filters.categoryType;

              if (filters.term) {
                const searchRegex = new RegExp(filters.term, "i");
                matchesTerm = searchRegex.test(business.name) || 
                              searchRegex.test(business.description) || 
                              searchRegex.test(business.category);
              }

              if (filters.categoryType) {
                matchesCategory = business.category === filters.categoryType;
              }

              return matchesTerm && matchesCategory;
            })
          );
        }

        // If no additional filters, return radius-filtered results
        return res.status(200).json(radiusResult);
      } catch (radiusError) {
        // If no businesses found in radius, return empty array
        return res.status(200).json([]);
      }
    }

    // If no radius filter, proceed with original filtering
    const businesses = await Businesses.find(query).sort({ createdAt: -1 }); 
    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//---------------------------------------------------------------------------------------------
//Artisan database here
//---------------------------------------------------------------------------------------------


async function getArtisansInRadius(req, res) {
  try {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    if (!loc.length) {
      return res.status(404).json({ error: "Invalid zipcode or location not found" });
    }
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calculate radius in radians (distance / Earth's radius in km)
    const radius = distance / 6378;

    // Find businesses within the radius
    const artisans = await Artisans.find({
      adress: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    if (!artisans.length) {
      return res.status(404).json({ error: "No artisans found in the specified radius" });
    }

    res.status(200).json({
      success: true,
      count: artisans.length,
      data: artisans,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




//get the artisans 
async function getArtisans(req, res) {
  try {
    const artisan = await Artisans.find({});
    if (!artisan) {
      return res.status(404).json({ error: "Data not Found" });
    }
    res.status(200).json(artisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// get the artisans for the user in session
async function getUserArtisans(req, res) {
  try {
    const { userID } = req.params;

    // Ensure userID is a valid ObjectId
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid or missing user ID" });
    }

    // Convert userID to an ObjectId
    const objectId = new mongoose.Types.ObjectId(userID);

    // Query artisans where the owner matches the userID
    const artisans = await Artisans.find({ owner: objectId });

    if (!artisans || artisans.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(artisans);
  } catch (error) {
    console.error("Error fetching artisans:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getArtisan(req, res) {
  try {
    const { artisanId } = req.params;

    if (artisanId) {
      const artisan = await Artisans.findById(artisanId);
      if (artisan) {
        res.status(200).json(artisan);
      } else {
        res.status(404).json({ error: "Artisan not found" });
      }
    } else {
      res.status(400).json({ error: "Artisan ID not selected" });
    }
  } catch (error) {
    res.status(500).json({ error: "Cannot get Artisan" });
  }
}

//Adding Artisan
async function addArtisan(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: "Form Data Not Provided" });
    }

    // Log the collection name being used
    console.log("Collection name:", Artisans.collection.name);

    // Create the new artisan entry
    const newArtisan = await Artisans.create(formData);

    console.log("Inserted Artisan into DB:", newArtisan);

    return res.status(201).json({ success: true, data: newArtisan });
  } catch (error) {
    // Log any errors for debugging
    console.error("Error adding Artisan:", error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}



//Updating a specific artisan based on ID
async function putArtisan(req, res) {
  try {
    const { artisanId } = req.query;
    const formData = req.body;

    if (artisanId && formData) {
      const artisan = await Artisans.findByIdAndUpdate(artisanId, formData);
      res.status(200).json(artisan);
    } else {
      res.status(404).json({ error: "Artisan Not Selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while updating the Artisan" });
  }
}


async function deleteArtisan(req, res) {
  try {
    const { artisanId } = req.query;

    if (artisanId) {
      const artisan = await Artisans.findByIdAndDelete(artisanId);
      return res.status(200).json(artisan);
    } else {
      res.status(404).json({ error: "Artisan not selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while deleting Artisan" });
  }
}

const getArtisansFiltered = async (req, res) => {
  try {
    const filters = req.query; 
    let query = {};

    // Text search across name, bio, and skills
    if (filters.term) {
      const searchRegex = new RegExp(filters.term, "i");
      query.$or = [
        { name: searchRegex },
        { bio: searchRegex },
        { skills: { $regex: searchRegex } },
      ];
    }

    // Exact match for skills (optional filter)
    if (filters.skill) {
      query.skills = { $elemMatch: { $regex: new RegExp(filters.skill, "i") } };
    }

    // If both zipcode and radius are provided, use getArtisansInRadius
    if (filters.zipcode && filters.radius) {
      try {
        // Create a new request-like object to use getArtisansInRadius
        const radiusReq = {
          params: {
            zipcode: filters.zipcode,
            distance: filters.radius
          }
        };

        const radiusResult = await new Promise((resolve, reject) => {
          getArtisansInRadius(radiusReq, {
            status: (code) => ({
              json: (data) => {
                if (code === 200) resolve(data.data);
                else reject(new Error(data.error));
              }
            })
          });
        });

        // If radius filtering is successful, apply additional filters if needed
        if (filters.term || filters.skill) {
          return res.status(200).json(
            radiusResult.filter(artisan => {
              let matchesTerm = !filters.term;
              let matchesSkill = !filters.skill;

              if (filters.term) {
                const searchRegex = new RegExp(filters.term, "i");
                matchesTerm = searchRegex.test(artisan.name) || 
                              searchRegex.test(artisan.bio) || 
                              artisan.skills.some(skill => searchRegex.test(skill));
              }

              if (filters.skill) {
                const skillRegex = new RegExp(filters.skill, "i");
                matchesSkill = artisan.skills.some(skill => skillRegex.test(skill));
              }

              return matchesTerm && matchesSkill;
            })
          );
        }

        // If no additional filters, return radius-filtered results
        return res.status(200).json(radiusResult);
      } catch (radiusError) {
        // If no artisans found in radius, return empty array
        return res.status(200).json([]);
      }
    }

    // If no radius filter, proceed with original filtering
    const artisans = await Artisans.find(query).sort({ createdAt: -1 });
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Error fetching artisans:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





  module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    postUser: postUser,
    putUser: putUser,
    deleteUser: deleteUser,
    checkUser: checkUser,
    getBusinesses: getBusinesses,
    getUserBusinesses: getUserBusinesses,
    getBusiness: getBusiness,
    addBusiness: addBusiness,
    putBusiness: putBusiness,
    deleteBusiness: deleteBusiness,
    getBusinessesFiltered: getBusinessesFiltered,
    getArtisans: getArtisans,
    getUserArtisans: getUserArtisans,
    getArtisan: getArtisan,
    addArtisan: addArtisan,
    putArtisan: putArtisan,
    deleteArtisan: deleteArtisan,
    getArtisansFiltered: getArtisansFiltered,
    getBusinessesInRadius:getBusinessesInRadius,
    getArtisansInRadius:getArtisansInRadius
  };