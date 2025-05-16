/** @format */

import { Request, Response, NextFunction } from 'express';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import * as WebhookService from '../../services/webhook-service/clerk/clerkWebhookService';

export const handleClerkWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { WEBHOOK_SECRET } = process.env;
  if (!WEBHOOK_SECRET) {
    return next(
      new Error(
        'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
      ),
    );
  }

  // Get the headers
  const svix_id = req.header('svix-id');
  const svix_timestamp = req.header('svix-timestamp');
  const svix_signature = req.header('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Error occurred -- no svix headers' });
  }

  // Get the body
  const payload = req.body;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  type WebhookEventMap = {
    'user.created': WebhookEvent & { type: 'user.created' };
    'user.updated': WebhookEvent & { type: 'user.updated' };
    'organization.created': WebhookEvent & { type: 'organization.created' };
    'organization.updated': WebhookEvent & { type: 'organization.updated' };
    'organization.deleted': WebhookEvent & { type: 'organization.deleted' };
    // Add more event types as needed
  };

  let x: WebhookEventMap['organization.deleted']['data'];
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    } as WebhookRequiredHeaders) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res
      .status(400)
      .json({ error: 'Error occurred while verifying webhook' });
  }

  // Process the event
  try {
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', body);

    await WebhookService.handleEvent(eventType, evt.data);
    return res
      .status(200)
      .json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Error processing webhook' });
  }
};
