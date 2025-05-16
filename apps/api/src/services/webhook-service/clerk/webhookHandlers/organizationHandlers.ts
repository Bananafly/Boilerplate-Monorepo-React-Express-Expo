/** @format */

import { getPrismaWithoutEnhancements } from "@/app/middleware/context";
import { WebhookEventMap } from "../types";

const prisma = getPrismaWithoutEnhancements();

export const handleOrganizationCreated = async (
  data: WebhookEventMap["organization.created"]["data"]
): Promise<void> => {
  console.log("Organization creation service with input data: ", data);
  // Implement your logic here

  const organization = await prisma.organization.create({
    data: {
      id: data.id,
      name: data.name,
      imageUrl: data.image_url,
      hasImage: data.has_image,
    },
  });

  console.log("Organization created in database:", organization);
};

export const handleOrganizationUpdated = async (
  data: WebhookEventMap["organization.updated"]["data"]
): Promise<void> => {
  console.log("Organization updated:", data);

  const organization = await prisma.organization.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      imageUrl: data.image_url,
      hasImage: data.has_image,
    },
  });
  console.log("Organization updated in database:", organization);
};

export const handleOrganizationMembershipCreated = async (
  data: WebhookEventMap["organizationMembership.created"]["data"]
): Promise<void> => {
  console.log("Organization membership created:", data);
  // Implement your logic here
  const membership = await prisma.membership.create({
    data: {
      id: data.id,
      organization: {
        connect: {
          id: data.organization.id,
        },
      },
      user: {
        connect: {
          id: data.public_user_data.user_id,
        },
      },
    },
  });
};
