/**Controller */
const Users = require("../../src/app/model/user");
const Businesses = require("../../src/app/model/business");
const mongoose = require("mongoose");


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
      const business = await Businesses.findById(propertyId);
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



//Updating a specific property based on ID
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

async function getBusinessesFiltered(req, res, filters = {}) {
  try {
    let query = {};

    if (filters.term) {
      query.address = new RegExp(filters.term, "i"); 
    }
    if (filters.saleType) {
      query.saletype = filters.saleType;
    }
    if (filters.propertyType) {
      query.propertytype = filters.propertyType;
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      query.pricetag = { $gte: min, $lte: max };
    }

    const business = await Properties.find(query);

    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


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
    deleteBusiness: deleteBusiness


  };