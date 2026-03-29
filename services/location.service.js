const { Location } = require("../models/");

module.exports = {

  create: async (locationId, name, address, located_at, cuisineId, priceId, openingHour, image) => {
    //The result object is where we will put the result to be sent to th client.
    let result = {
      message: null,
      status: null,
      data: null,
    };

    //Look for the restaurant and in the database.
    const newLocation = await Location.create({
        name: name,
        address: address,
        located_at: located_at,
        cuisineId: cuisineId,
        priceId: priceId,
        openingHour: openingHour,
        image: image,
      });

    await newLocation.save(); // update the location
    result.data = newLocation;
    result.status = 200;
    result.message = "Update successful";

    return result;
  },
  
  update: async (locationId, name, address, located_at, cuisineId, priceId, openingHour, image) => {
    //The result object is where we will put the result to be sent to th client.
    let result = {
      message: null,
      status: null,
      data: null,
    };

    //Look for the restaurant and in the database.
    const location = await Location.findByPk(locationId);

    //check if restarurant exists
    if (!location) {
      result.message = `Location ID ${locationId} is not found`;
      result.status = 404;
      return result;
    }

    // Make sure the sequence is the same as in the  update: async (...)
    location.name = name;
    location.address = address;
    location.located_at = located_at;
    location.cuisineId = cuisineId;
    location.priceId = priceId;
    location.openingHour = openingHour;
    location.image = image;


    await location.save(); // update the location
    result.data = location;
    result.status = 200;
    result.message = "Update successful";

    return result;
  },

  delete: async (locationId) => {
    let result = {
      message: null,
      status: null,
      data: null,
    };

    const location = Location.findByPk(locationId);
    console.log("Location", location)

    await Location.destroy({ where: { id: locationId } });

    result.data = location;
    result.status = 200;
    result.message = "deleted successful";

    return result;
  },
};
