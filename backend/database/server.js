const express = require("express");
const next = require("next");
const connectMongo = require("./conn.js");
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  checkUser,
  getBusinesses,
  getUserBusinesses,
  getBusiness,
  addBusiness,
  putBusiness,
  deleteBusiness,
  getBusinessesFiltered,
  getArtisans,
  getUserArtisans,
  getArtisan,
  addArtisan,
  putArtisan,
  deleteArtisan,
  getBusinessesInRadius,
  getArtisansInRadius,
  getArtisansFiltered} = require("./controller.js");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  connectMongo().catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
  

  // Add your Express middleware and routes here

  //---------------------------------------------------------------
  //For users
  //---------------------------------------------------------------
  server.get("/api/userExists/:email", async (req, res) => {
    checkUser(req, res);
  });

  server.get("/api/users", (req, res) => {
    getUsers(req, res);
  });

  server.get("/api/users/:userID", (req, res) => {
    getUser(req, res);
  });

  server.post("/api/users", (req, res) => {
    postUser(req, res);
  });

  server.put("/api/users", (req, res) => {
    putUser(req, res);
  });

  server.delete("/api/users", (req, res) => {
    deleteUser(req, res);
  });


  
  //---------------------------------------------------------------
  //For businesses
  //---------------------------------------------------------------
  
  server.get("/api/businessradius/:zipcode/:distance", (req, res) => {
    getBusinessesInRadius(req, res);
  });

  
  server.get("/api/business", (req, res) => {
    getBusinesses(req, res);
  });

  server.get("/api/userbusiness/:userID", (req, res) => {
    getUserBusinesses(req, res);
  });
  
  server.get("/api/business/:businessId", (req, res) => {
    getBusiness(req, res);
  });

  server.post("/api/business", (req, res) => {
    addBusiness(req, res);
  });

  server.put("/api/business", (req, res) => {
    putBusiness(req, res);
  });

  server.delete("/api/business", (req, res) => {
    deleteBusiness(req, res);
  });

  server.get("/api/businessfilter", (req, res) => {
    const { term, category, zipcode, radius } = req.query;
  
    getBusinessesFiltered(req, res, {
      term,
      category,
      zipcode,
      radius
    });
  });

  
  //---------------------------------------------------------------
  //For artisans
  //---------------------------------------------------------------
  server.get("/api/artisansradius/:zipcode/:distance", (req, res) => {
    getArtisansInRadius(req, res);
  });

  
  server.get("/api/artisan", (req, res) => {
    getArtisans(req, res);
  });

  server.get("/api/userartisan/:userID", (req, res) => {
    getUserArtisans(req, res);
  });
  
  server.get("/api/artisan/:artisanId", (req, res) => {
    getArtisan(req, res);
  });

  server.post("/api/artisan", (req, res) => {
    addArtisan(req, res);
  });

  server.put("/api/artisan", (req, res) => {
    putArtisan(req, res);
  });

  server.delete("/api/artisan", (req, res) => {
    deleteArtisan(req, res);
  });

  server.get("/api/artisanfilter", (req, res) => {
    const { term, categoryType, zipcode, radius } = req.query;

    getArtisansFiltered(req, res, {
      term,
      categoryType,
      zipcode,
      radius
    });
  });

  //---------------------------------------------------------------
  //For tests
  //---------------------------------------------------------------
  server.get('/test', async (req, res) => {
    res.json({message: 'pass!'})
  })

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });

});

module.exports = app;