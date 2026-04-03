const express = require("express");
const router = express.Router();
const { Location, Favorite, User } = require("../models");
const LocationController = require("../controllers/LocationController");
const ReviewController = require("../controllers/ReviewController");
const FavoriteController = require("../controllers/FavoriteController");
const { sequelize } = require('../models');
const locationController = new LocationController();
const reviewController = new ReviewController();
const favoriteController = new FavoriteController();
const app = express();
app.use(express.json()); // Enable express to parse JSON as request body.
const cors = require('cors');

app.use(cors());
router.get("/user", (req, res) => {
  return res.send("You have called a user route");
});

router.get(
  "/user/location/:id",
  async (req, res) => {
    try {
      const results = await Location.findAll({
        where: { id: req.params.id }
      });
    
      if (results.length === 0) {
        res.status(404).send("Location ID not found");

      } else {
        
        console.table(JSON.parse(JSON.stringify(results)));
        return res.send(JSON.stringify(results));
      }
    
    } catch (err) { 
        
        console.error(err.message);
    } 
  } 
);

router.get(
  "/user/favorite",
  async (req, res) => {
    try {
      const results = await Favorite.findAll({
        // attributes: {
        //   includes: [
        //     [sequelize.fn('COUNT', sequelize.col('location_id')), `n_${location_id}`]
        //   ]
        // }
        // where: { id: req.params.id }
      });
      console.table(JSON.parse(JSON.stringify(results)));
      return res.send(JSON.stringify(results));

    } catch (err) {
        res.status(404).send("Favorite ID not found");
    } 
  } 
);

router.get(
  "/user/favorite/user/:user_id",
  async (req, res) => {
    try {
      const results = await Favorite.findAll({
         where: { user_id: req.params.user_id }
      });
      console.table(JSON.parse(JSON.stringify(results)));
      return res.send(JSON.stringify(results));

    } catch (err) {
        res.status(404).send("User ID not found");
    } 
  } 
);

router.get(
  "/user/favorite/location/:location_id",
  async (req, res) => {
    try {
      const results = await Favorite.findAll({
        where: { location_id: req.params.location_id },
        attributes: 
          ['location_id', [sequelize.fn('count', sequelize.col('location_id')), 'n_location_id']],
        
        group: ["Favorite.location_id"],        
        raw: true,  
      });

      console.table(JSON.parse(JSON.stringify(results)));
      return res.send(JSON.stringify(results));

    } catch (err) {
        res.status(404).send("Location ID not found");
    } 
  } 
);


router.post("/user/signout", function(req, res) {
  res.status(200).send({
    accessToken : null,
  });
});


router.post("/user/newreview", reviewController.create);

router.post("/user/addfavorite", favoriteController.create);
router.delete("/user/favorite/:id", favoriteController.delete);

router.post("/user/newlocation", locationController.create);
router.put("/user/location", locationController.update);
router.delete("/user/location/:locationId", locationController.delete);

module.exports = router;
