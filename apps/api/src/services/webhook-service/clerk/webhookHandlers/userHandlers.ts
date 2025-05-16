/** @format */

import { User } from "@clerk/clerk-sdk-node";
import { WebhookEventMap } from "../types";
import { getPrismaWithoutEnhancements } from "@/app/middleware/context";

const prisma = getPrismaWithoutEnhancements();

export const handleUserCreated = async (
  data: WebhookEventMap["user.created"]["data"]
): Promise<void> => {
  console.log("User created:", data);
  // Implement your logic here, e.g., create a user in your database
  const user = await prisma.user.create({
    data: {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      profileImageUrl: data.image_url,
      hasImage: !!data.image_url,
      primaryEmailAddressId: data.primary_email_address_id,
      eMailAdresses: {
        create: data.email_addresses.map((email) => ({
          email: email.email_address,
          id: email.id,
        })),
      },
    },
  });
};

export const handleUserUpdated = async (
  data: WebhookEventMap["user.updated"]["data"]
): Promise<void> => {
  console.log("User updated:", data);
  // Implement your logic here, e.g., update user in your database
  try {
    await prisma.user.update({
      where: { id: data.id },
      data: {
        firstName: data.first_name,
        lastName: data.last_name,
        profileImageUrl: data.image_url,
        hasImage: !!data.image_url,
        primaryEmailAddressId: data.primary_email_address_id,
        eMailAdresses: {
          deleteMany: {},
          create: data.email_addresses.map((email) => ({
            id: email.id,
            email: email.email_address,
          })),
        },
      },
    });

    console.log("User and email addresses updated successfully");
  } catch (error) {
    console.error("Error updating user and email addresses:", error);
    // Handle the error appropriately (e.g., logging, notifying administrators)
  }
};
