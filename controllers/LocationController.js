const locationService = require("../services/location.service");

class LocationController {
  
  async update(req, res) {
    const { locationId, name, address, located_at, cuisineId, priceId, openingHour, image } = req.body;
    if (
      typeof locationId !== "number" ||
      typeof name !== "string" ||
      typeof address !== "string" ||
      typeof located_at !== "string" ||
      typeof cuisineId !== "string" ||
      typeof priceId !== "string" ||
      typeof openingHour !== "string" ||
      typeof image !== "string"
    ) {
      res.status(400);
      return res.send("Incorrect request data");
    }
    // Make sure the sequence is the same as in vehicle.
    const { status, data, message } = await locationService.update(
      locationId,
      name,
      address,
      located_at,
      cuisineId,
      priceId,
      openingHour,
      image
    );
    res.status(status);

    res.json({ message, data });
  }

  async create(req, res) {
    const { locationId, name, address, located_at, cuisineId, priceId, openingHour, image} = req.body;
    if(
      typeof name !== "string" || 
      typeof address !== "string" || 
      typeof located_at !== "string" || 
      typeof cuisineId !== "string" || 
      typeof priceId !== "string" || 
      typeof openingHour !== "string" || 
      typeof image !== "string"
      ){
      return res.status(400).send("Incorrect request data");
    }

    // Make sure the sequence is the same as in location.
    const { status, data, message } = 
      await locationService.create(
        locationId,
        name,
        address,
        located_at,
        cuisineId,
        priceId,
        openingHour,
        image
      );
    
    res.status(status);
    res.json({ message, data });
    
  }
  
  async delete(req, res) {
    const locationId = req.params.locationId;
    console.log(locationId);

    const { status, data, message } = await locationService.delete(
      locationId
    );

    res.status(status);

    res.json({ message, data });
  }
}


module.exports = LocationController;
