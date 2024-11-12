/**Controller */
const Users = require("../../src/app/model/user");


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

  module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    postUser: postUser,
    putUser: putUser,
    deleteUser: deleteUser,
    checkUser: checkUser
  };