/** @format */

import { WebhookEvent } from "@clerk/clerk-sdk-node";

export type WebhookEventMap = {
  "user.created": WebhookEvent & { type: "user.created" };
  "user.updated": WebhookEvent & { type: "user.updated" };
  "organization.created": WebhookEvent & { type: "organization.created" };
  "organization.updated": WebhookEvent & { type: "organization.updated" };
  "organization.deleted": WebhookEvent & { type: "organization.deleted" };
  "organizationMembership.created": WebhookEvent & {
    type: "organizationMembership.created";
  };

  // Add more event types as needed
};
