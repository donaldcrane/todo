import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";
import {
  user, user2, user3, user5, user6, user7, user10
} from "./user-data";

chai.should();
chai.use(chaiHttp);
describe("Should test all registration", async () => {
  describe("/api/v1/users/signup should create a user", () => {
    it("it should create a user with complete details successfully", done => {
      chai
        .request(server)
        .post("/api/v1/users/signup")
        .set("Accept", "application/json")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql(201);
          res.body.should.have.property("message").eql("User created successfully");
          done();
        });
    });
    it("it should not create a user with incomplete details", done => {
      chai
        .request(server)
        .post("/api/v1/users/signup")
        .set("Accept", "application/json")
        .send(user2)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("it should not signup a user with an already registered email", done => {
      chai
        .request(server)
        .post("/api/v1/users/signup")
        .set("Accept", "application/json")
        .send(user3)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
  });
});

describe("Should test logging in", async () => {
  describe("/api/v1/users/signin should sign in a user", () => {
    it("it should sign in a user with complete details successfully", done => {
      chai
        .request(server)
        .post("/api/v1/users/signin")
        .set("Accept", "application/json")
        .send(user7)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("User Logged in Successfully");
          done();
        });
    });
    it("it should not sign in a user with incomplete details", done => {
      chai
        .request(server)
        .post("/api/v1/users/signin")
        .set("Accept", "application/json")
        .send(user5)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("it should not sign in a user that is de-activated", done => {
      chai
        .request(server)
        .post("/api/v1/users/signin")
        .set("Accept", "application/json")
        .send(user10)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it("it should not sign in a user without a registered email", done => {
      chai
        .request(server)
        .post("/api/v1/users/signin")
        .set("Accept", "application/json")
        .send(user6)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error").eql("Email does not exist.");
          done();
        });
    });
  });
});
