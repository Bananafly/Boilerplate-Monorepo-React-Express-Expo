/** @format */

import { WebhookEvent } from "@clerk/clerk-sdk-node";
import * as handlers from "./webhookHandlers";

type EventHandler = (data: any) => Promise<void>;

const eventHandlers: Record<string, EventHandler> = {
  "user.created": handlers.handleUserCreated,
  "user.updated": handlers.handleUserUpdated,
  "organization.created": handlers.handleOrganizationCreated,
  "organization.updated": handlers.handleOrganizationUpdated,
  "organizationMembership.created":
    handlers.handleOrganizationMembershipCreated,
  // Add more handlers here as needed
};

export const handleEvent = async (
  eventType: WebhookEvent["type"],
  data: WebhookEvent["data"]
): Promise<void> => {
  const handler = eventHandlers[eventType];
  if (handler) {
    await handler(data);
  } else {
    console.log(`Unhandled event type: ${eventType}`);
    console.log("Event data:", data);
  }
};
