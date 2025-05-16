/** @format */

const express = require("express");
const router = express.Router();
const WebhookController = require("../controllers/webhookController");

router.post("/clerk", WebhookController.handleClerkWebhook);

export default router;
