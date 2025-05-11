/** @format */
import { AsyncLocalStorage } from 'async_hooks';
import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { PermissionsCache } from './permissionsCache';

interface RequestContext {
  orgId?: string;
  userId?: string;
  prisma: PrismaClient;
}

// Create singletons
const prisma = new PrismaClient();

const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();
const permissionsCache = new PermissionsCache(prisma);

export const context = {
  createContext: async (
    userId: string,
    orgId: string,
    orgIdJWT?: string,
  ): Promise<RequestContext> => {
    try {
      // Get user data from cache or DB
      const userData = await permissionsCache.getUserPermissionsData(userId);
      if (!userData) {
        throw new Error('User not found');
      }

      const currentOrgId = orgId || orgIdJWT;
      const currentMembership = userData.user.memberships.find(
        (membership) => membership.orgId === currentOrgId,
      );

      if (!currentMembership) {
        throw new Error('User does not belong to the specified organization');
      }

      const enhancedPrisma = enhance(prisma, {
        user: {
          id: userData.user.id,
          currentOrgId,
          memberships: userData.user.memberships,
        },
      });

      return { userId, orgId: currentOrgId, prisma: enhancedPrisma };
    } catch (error) {
      throw error;
    }
  },

  // Cache management
  invalidateUserCache: (userId: string) => {
    permissionsCache.invalidateUser(userId);
  },

  run: (context: RequestContext, fn: () => void) => {
    asyncLocalStorage.run(context, fn);
  },

  getOrgId: (): string | undefined => {
    return asyncLocalStorage.getStore()?.orgId;
  },

  getUserId: (): string | undefined => {
    return asyncLocalStorage.getStore()?.userId;
  },

  getPrisma: (): PrismaClient => {
    const store = asyncLocalStorage.getStore();
    if (!store || !store.prisma) {
      throw new Error('Prisma client is not available in this context');
    }
    return store.prisma;
  },
};

function getPrismaWithoutEnhancements() {
  return prisma;
}

export async function shutdown() {
  permissionsCache.shutdown();
  await prisma.$disconnect();
}

export { getPrismaWithoutEnhancements };
export const { getPrisma } = context;
export const { getOrgId } = context;
export const { getUserId } = context;
