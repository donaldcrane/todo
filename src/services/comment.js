import database from "../models";

/**
 * @class Admin
 * @description allows admin user create and check comment details
 * @exports Admin
 */
export default class Admin {
  /**
   * @param {string} newComment - The comment details
   * @returns {object} An instance of the comments model class
   */
  static async addComment(newComment) {
    try {
      return await database.Comments.create(newComment);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the comment class
   */
  static async getAllComment() {
    try {
      return await database.Comments.findAll({ });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Comments model class
   *  @param {string} userId - The comment id
   */
  static async getAllUserComment(userId) {
    try {
      return await database.Comments.findAll({ where: { userId } });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Comments model class
   *  @param {string} userId - The comment id
   */
  static async findUser(userId) {
    try {
      return await database.Users.findOne({ where: { id: userId } });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} commentId - The comment id
   * @returns {object} An instance of the comments model class
   */
  static async getComment(commentId) {
    try {
      return await database.Comments.findOne({
        where: {
          id: commentId
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The comment name
   * @returns {object} An instance of the comments model class
   */
  static async deleteComment(id) {
    try {
      const comment = await database.Comments.findOne({ where: { id } });
      return await comment.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The old comment name
   * @param {string} comment - The new comment details
   * @returns {object} An instance of the comments model class
   */
  static async updateComment(id, comment) {
    try {
      return await database.Comments.update(comment, {
        where: { id },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }
}
