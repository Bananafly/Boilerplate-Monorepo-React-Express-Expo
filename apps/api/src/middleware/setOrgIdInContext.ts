/** @format */
import { Request, Response, NextFunction } from "express";
import { context } from "@/app/middleware/context";

export const setOrgIdInContext = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.auth as any)?.userId as string;
  const orgId = (req.auth as any)?.orgId as string;
  const orgIdJWT = (req.auth as any)?.sessionClaims?.orgId as string;

  if (!userId || (!orgId && !orgIdJWT)) {
    return res.status(403).send("User ID and Organization ID are required");
  }

  try {
    const ctx = await context.createContext(userId, orgId, orgIdJWT);

    context.run(ctx, next);
  } catch (error) {
    console.error("Error creating context:", error);
    res.status(500).send("Internal server error");
  } finally {
    // console.log("Clerk Auth Success:", req.auth); // Log the auth object if authentication succeeds
  }
};
