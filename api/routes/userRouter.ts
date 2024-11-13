import express from "express";
import {
  getUserById,
  updateUser,
  getUserIntegrations,
  connectJira,
  connectMotion,
} from "../controllers/userController";

const router = express.Router();

router.get("/:userId", getUserById);
router.patch("/:userId", updateUser);
router.get("/:userId/integrations", getUserIntegrations);
router.post("/:userId/integrations/jira", connectJira);
router.post("/:userId/integrations/motion", connectMotion);

export default router;
