import Admin from "../services/comment";
import { validateComment, validateId } from "../validation/commentValidation";

export default class commentController {
  /**
   * allows a user to make a comment
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} success message | error
   */
  static async addComment(req, res) {
    try {
      const { userId } = req.params;
      const { task } = req.body;
      const newComment = { userId, task };
      const { error } = validateComment(newComment);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const createdComment = await Admin.addComment(newComment);
      return res.status(201).json({ status: 201, message: "Comment has been added", data: createdComment });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getComment(req, res) {
    try {
      const { id } = req.params;
      const comment = await Admin.getComment(id);
      if (!comment) return res.status(404).json({ status: 404, error: "Resource not found.", });
      return res.status(200).json({ status: 200, message: "Successfully retrived comment", data: comment });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getAllComments(req, res) {
    try {
      const comments = await Admin.getAllComment();
      return res.status(200).json({ status: 200, message: "Successfully retrived all comments", data: comments });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getUsersComments(req, res) {
    try {
      const { userId } = req.params;
      const { error } = validateId(req.params);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const user = await Admin.findUser(userId);
      if (!user) return res.status(404).json({ status: 404, error: "Resource not found.", });
      const comments = await Admin.getAllUserComment(userId);
      return res.status(200).json({ status: 200, message: "Successfully retrived comments", data: comments });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const { id } = req.decoded.user;
      const {
        task
      } = req.body;
      console.log(commentId);
      console.log(id);
      const { error } = validateId({ userId: id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const oldComment = await Admin.getComment(commentId);
      if (!oldComment) return res.status(404).json({ status: 404, error: "Resource not found." });
      if (id !== oldComment.userId) {
        return res.status(403).json({ status: 403, error: "Access denied" });
      }
      const newComment = await Admin.updateComment(commentId, req.body);
      return res.status(200).json({
        status: 200,
        message: "Successfully updated comment",
        data: newComment[1],
      });
    } catch (error) {
      return res.status(404).json({ status: 404, error: "Resource not found.", });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const comment = await Admin.getComment(id);
      if (!comment) return res.status(404).json({ status: 404, error: "Resource not found." });
      if (comment.userId !== req.decoded.user.id) {
        return res.status(401).json({ status: 401, error: "You are not authorized to perform this action.", });
      }
      await comment.destroy({ cascade: true });
      return res.status(200).json({ status: 200, message: "Successfully deleted comment", });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }
}
