import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middleware/authenticate";

const router = Router();
const { verifyToken, verifyUserById } = Authentication;
const { registerUser, loginUser, updateUserProfile } = UserController;

router.post("/users/signup", registerUser);

router.patch("/user-profile", verifyToken, verifyUserById, updateUserProfile);
router.post("/users/signin", loginUser);

export default router;
