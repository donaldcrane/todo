import chai from "chai";
import chaiHttp from "chai-http";
import { user7, user8 } from "../user/user-data";
import server from "../../app";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Activate a user", () => {
  let adminToken;
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user7)
      .end((err, res) => {
        if (err) throw err;
        adminToken = res.body.data;
        done();
      });
  });
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user8)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow user with admin role activate a user", done => {
    chai
      .request(server)
      .put("/api/v1/admin/activate-user/fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User activated successfully!");
        done();
      });
  });
  it("should not allow user without token activate a user", done => {
    chai
      .request(server)
      .put("/api/v1/admin/activate-user/fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it("should not allow user without admin role activate a user", done => {
    chai
      .request(server)
      .put("/api/v1/admin/activate-user/57af7c29-efb2-434e-9fce-b87c77447aaa")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
