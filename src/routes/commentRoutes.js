import { Router } from "express";
import commentController from "../controllers/comment";
import Authentication from "../middleware/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  getComment, getAllComments, getUsersComments, addComment, deleteComment, updateComment
} = commentController;

router.post("/comment/:userId", verifyToken, addComment);
router.get("/comment/:id", verifyToken, getComment);
router.get("/user-comments/:userId", verifyToken, getUsersComments);
router.get("/comments", getAllComments);
router.put("/comment/:commentId", verifyToken, updateComment);
router.delete("/comment/:id", verifyToken, deleteComment);

export default router;
