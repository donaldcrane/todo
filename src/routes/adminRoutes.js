import { Router } from "express";
import AdminController from "../controllers/admin";
import Authentication from "../middleware/authenticate";

const router = Router();
const { ActivateUser, DeActivateUser } = AdminController;
const { verifyToken, verifyAdmin } = Authentication;

router.put("/admin/activate-user/:id", verifyToken, verifyAdmin, ActivateUser);
router.put("/admin/deactivate-user/:id", verifyToken, verifyAdmin, DeActivateUser);

export default router;
