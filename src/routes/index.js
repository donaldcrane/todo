import { Router } from "express";
import userRoutes from "./userRoutes";
import commentRoutes from "./commentRoutes";
import adminRoutes from "./adminRoutes";
// import docRoutes from "./docsRoutes";

// const swaggerUi = require("swagger-ui-express");

const router = new Router();

// router.use("/", swaggerUi.serve, docRoutes);

router.use("/", userRoutes);
router.use("/", commentRoutes);
router.use("/", adminRoutes);

export default router;
