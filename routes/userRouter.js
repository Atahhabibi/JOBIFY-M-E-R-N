import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { authorizePermission } from "../middleware/authMiddleware.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermission("admin"), getApplicationStats);
router.route("/update-user").patch(validateUpdateUserInput, updateUser);

export default router;
