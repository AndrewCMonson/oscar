import express from "express";
import {
  connectJira,
  connectMotion,
  getUserById,
  getUserIntegrations,
  updateUser,
} from "../services/userServices";

const router = express.Router();

router.get("/:userId", getUserById);
router.patch("/:userId", updateUser);
router.get("/:userId/integrations", getUserIntegrations);
router.post("/:userId/integrations/jira", connectJira);
router.post("/:userId/integrations/motion", connectMotion);

export default router;
