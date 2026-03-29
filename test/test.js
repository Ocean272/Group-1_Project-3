const request = require('supertest');
const server = "http://localhost:3000";

// *****************************  TEST LOCATIONS API  ********************************

describe("LOCATIONS", () => {
  describe('/GET all restaurant locations', () => {
    it('should return 200 OK with all restaurant', async () => {
      const res = await request(`${server}`) 
        .get(`/public/location`)
        .expect(200)

      const locations = res.body;
        expect(locations).to.be.an('object');
    })

    it('should have all restaurant details', async () => {
      const res = await request(`${server}`) 
        .get(`/public/location`)
        .expect(200);

      const locations = res.body;
      expect(locations).to.be.an('object');

      Array.from(locations).forEach(location => {
        expect(location.name).to.be.a("string");
        expect(location.address).to.be.a("string");
        expect(location.located_at).to.be.a("string");
        expect(location.cuisineId).to.be.a("string");
        expect(location.priceId).to.be.a("string");
        expect(location.openingHour).to.be.a("string");
        expect(location.image).to.be.a("string");
      })
    })

  describe('/GET location/:id', () => {
    it('should query one individual restaurant', async () => {
      const res = await request(`${server}`) 
        .get(`/user/location/`+ 10)
        .expect(200);
  
      const indRestaurants = res.body;
      expect(indRestaurants).to.be.an('object');
  
      Array.from(indRestaurants).forEach(indRestaurant => {
        expect(indRestaurant.name).to.be.a("string");
        expect(indRestaurant.address).to.be.a("string");
        expect(indRestaurant.located_at).to.be.a("string");
        expect(indRestaurant.cuisineId).to.be.a("string");
        expect(indRestaurant.priceId).to.be.a("string");
        expect(indRestaurant.openingHour).to.be.a("string");
        expect(indRestaurant.image).to.be.a("string");
  
      })
    })

    // it("it should query a NON EXISTED Restaurant",  (done) => {
    //   request(server)
    //     .get("/user/location/"+ 22)
    //     .set('Accept', 'application/json')
    //     .expect(404)
    //     .expect('Content-Type', /json/)
    //     .expect('message: Location ID not found')
    //     .end((err, res) => {
    //       //console.log("CHECK IS USER IN THE DATABASE");
    //       res.should.have.status(404);
    //     })
    //     done();
    //   })
    })

  // describe("/POST a restaurant location", () => {
  //   it("it should POST a new restaurant location", (done) => {
  //     let myRestaurant = {
  //       "name": "Superstar K",
  //       "address": "75 Tanjong Pagar Road Singapore 088496",
  //       "located_at": "South",
  //       "cuisineId": "Korean",
  //       "priceId": "moderate",
  //       "openingHour": "11am to 2am",
  //       "image": "https://sethlui.com/wp-content/uploads/2014/11/supper-listicle-14.jpg"
  //     };
  //       chai.request(server)
  //         .post("/user/newlocation")
  //         .send(myRestaurant)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a("object");
  //           res.body.should.have
  //             .property("message")
  //             .eql("Update successful");
  //         done();
  //         console.log(myRestaurant)
  //       });
  //     });
  //  })
  })
});

// ****************************  TEST USERS API  ********************************

describe("USERS", () => {
  describe('/GET all user content', () => {
    it("should list all users", async () => {
      const res = await request(`${server}`)
        .get(`/login/user`) 
        .expect(200);

      const users = res.body; 
      expect(users).to.be.an('object');

      Array.from(users).forEach(user => {
        expect(user.username).to.be.a("string");
        expect(user.email).to.be.a("string");
        expect(user.password).to.be.a("string");
          
      });
    });
  });

//   // describe("/POST a new user", () => {
//   //   it("it should Register a new user", async (done) => {
//   //     let myNewuser = {
//   //       "username": "Valentine",
//   //       "email": "valentine@hotmail.com",
//   //       "password": "12345"
//   //     };
//   //     chai.request(server)
//   //       .post("/login/signup")
//   //       .send(myNewuser)
//   //       .end((err, res) => {
//   //         res.should.have.status(200);
//   //         res.body.should.be.a("object");
//   //         res.body.should.have
//   //           .property("message")
//   //           .eql("New user is created!");
//   //         })
//   //     done();
//   //   });
//   // });


//   describe("/POST a signin user", () => {
//     it("it should BE AN UNSUCCESSFUL LOGIN user",  (done) => {
//       request(server)
//         .post("/login/signin")
//         .send({
//           "username":"Zeus",
//           "password":"12345"
//         })
//         .set('Accept', 'application/json')
//         .expect(404)
//         .expect('Content-Type', /json/)
//         .expect('message: User Not found')
//         .end((err, res) => {
//           //console.log("CHECK IS USER IN THE DATABASE");
//           res.should.have.status(404);
//         })
//       done();
//     });
//   });
 });

// *****************************  TEST REVIEWS API  ********************************

describe("REVIEWS", () => {
  describe('/GET all reviews', () => {
    it('should list all review contents', async () => {
      const res = await request(`${server}`) 
        .get(`/public/review`)
        .expect(200)

      const reviews = res.body;
        expect(reviews).to.be.an('object');
    })

  // describe("/POST review", () => {
  //   it("it should POST a review", (done) => {
  //     let myreview = {
  //       "location_id": "9",
  //       "user_id": "14",
  //       "review": "Authentic Korean food.  Nice environment to dine in.",
  //     };
  //     chai.request(server)
  //       .post("/user/newreview")
  //       .send(myreview)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.should.have
  //           .property("message")
  //           .eql("Update successful");
  //       done();
  //     });
  //   });
  });
});


