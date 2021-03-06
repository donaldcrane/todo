import chai from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

const { expect } = chai;

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require("sequelize-test-helpers");

const CommentModel = require("../../models/comment.js");

describe("src/models/comment", () => {
  const Comment = CommentModel(sequelize, dataTypes);
  const comment = new Comment();

  checkModelName(Comment)("Comments");

  context("properties", () => {
    ["userId", "task"].forEach(checkPropertyExists(comment));
  });

  context("associations", () => {
    const Users = "John Doe";

    before(() => {
      Comment.associate({ Users });
    });

    it("defined a belongsTo association with Users", () => {
      expect(Comment.belongsTo).to.have.been.calledWith(Users);
    });
  });
});
